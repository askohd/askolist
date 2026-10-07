const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const swc = require("next/dist/build/swc");

// Exercise the installed NextAuth provider normalization and OAuth client.
const nextAuthRoot = path.dirname(require.resolve("next-auth"));
const parseProviders = require(path.join(nextAuthRoot, "core/lib/providers.js")).default;
const { openidClient } = require(path.join(nextAuthRoot, "core/lib/oauth/client.js"));

function loadAuthOptions() {
  const filename = path.join(__dirname, "../lib/auth.ts");
  const source = fs.readFileSync(filename, "utf8");
  const { code } = swc.transformSync(source, {
    jsc: { parser: { syntax: "typescript" }, target: "es2022" },
    module: { type: "commonjs" },
  });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    require: createRequire(filename),
    module,
    exports: module.exports,
    // Tests never use production credentials or exchange real authorization codes.
    process: {
      env: {
        DISCORD_CLIENT_ID: "test-client-id",
        DISCORD_CLIENT_SECRET: "test-client-secret",
      },
    },
  }, { filename });
  return module.exports.authOptions;
}

async function discordClient() {
  const authOptions = loadAuthOptions();
  const { provider } = parseProviders({
    providers: authOptions.providers,
    url: "https://askolist.example/api/auth",
    providerId: "discord",
  });
  assert.ok(provider.checks.includes("state"), "OAuth state validation must remain enabled");
  const client = await openidClient({ provider });
  const grants = [];
  client.grant = async (body) => {
    grants.push(body);
    return { access_token: "test-access-token", token_type: "Bearer" };
  };
  return { client, provider, grants };
}

test("Discord callback accepts its issuer and exchanges the authorization code", async () => {
  const { client, provider, grants } = await discordClient();
  const params = client.callbackParams(
    `${provider.callbackUrl}?code=test-code&state=test-state&iss=https%3A%2F%2Fdiscord.com`
  );
  const tokens = await client.oauthCallback(provider.callbackUrl, params, { state: "test-state" });

  assert.equal(tokens.access_token, "test-access-token");
  assert.equal(grants.length, 1);
  assert.equal(grants[0].grant_type, "authorization_code");
  assert.equal(grants[0].code, "test-code");
  assert.equal(grants[0].redirect_uri, provider.callbackUrl);
});

test("Discord callback rejects a foreign issuer before exchanging the code", async () => {
  const { client, provider, grants } = await discordClient();
  await assert.rejects(
    client.oauthCallback(provider.callbackUrl, {
      code: "test-code",
      state: "test-state",
      iss: "https://attacker.example",
    }, { state: "test-state" }),
    /iss mismatch/
  );
  assert.equal(grants.length, 0);
});

test("Discord callback remains compatible with responses without an issuer", async () => {
  const { client, provider, grants } = await discordClient();
  const tokens = await client.oauthCallback(provider.callbackUrl, {
    code: "test-code",
    state: "test-state",
  }, { state: "test-state" });

  assert.equal(tokens.access_token, "test-access-token");
  assert.equal(grants.length, 1);
});

test("Discord callback still rejects an OAuth state mismatch before exchanging the code", async () => {
  const { client, provider, grants } = await discordClient();
  await assert.rejects(
    client.oauthCallback(provider.callbackUrl, {
      code: "test-code",
      state: "wrong-state",
      iss: "https://discord.com",
    }, { state: "test-state" }),
    /state mismatch/
  );
  assert.equal(grants.length, 0);
});
