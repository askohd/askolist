const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const swc = require("next/dist/build/swc");

// Load the real route with in-memory auth/database dependencies. No live writes.
function loadTs(relativePath, dependencies = {}) {
  const filename = path.join(__dirname, "..", relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const { code } = swc.transformSync(source, {
    jsc: { parser: { syntax: "typescript" }, target: "es2022" },
    module: { type: "commonjs" },
  });
  const module = { exports: {} };
  const run = vm.runInThisContext(
    `(function(require, module, exports) { ${code}\n })`,
    { filename }
  );
  run((name) => dependencies[name] ?? require(name), module, module.exports);
  return module.exports;
}

const inviteHelpers = loadTs("lib/discord-invite.ts");
const OWNER_ID = "123456789012345678";
const GUILD_ID = "223456789012345678";
const OTHER_GUILD_ID = "323456789012345678";
const originalServer = {
  id: "server-1",
  owner_discord_user_id: OWNER_ID,
  discord_server_id: GUILD_ID,
  invite_link: "https://discord.gg/old-invite",
  server_name: "Example server",
  description: "Example description",
  language: "Deutsch",
  premium_status: false,
};

function form(values = {}) {
  const data = new FormData();
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}

function nextResponse() {
  return {
    redirect: (url, options = {}) => Response.redirect(url, options.status ?? 307),
    json: (value, options) => Response.json(value, options),
  };
}

function profileRoute(options = {}) {
  const calls = [];
  const fetchCalls = [];
  const server = options.server ?? originalServer;
  const route = loadTs("app/api/profile/update-server/route.ts", {
    "next/server": { NextResponse: nextResponse() },
    "next-auth": {
      getServerSession: async () =>
        options.session === undefined ? { user: { discordId: OWNER_ID } } : options.session,
    },
    "@/lib/auth": { authOptions: {} },
    "@/lib/supabase-admin": {
      supabaseAdmin: { storage: { from: () => { throw new Error("Unexpected upload"); } } },
    },
    "@/lib/discord-invite": {
      validateServerInviteUpdate: (data, existingServer) =>
        inviteHelpers.validateServerInviteUpdate(data, existingServer, async (...args) => {
          fetchCalls.push(args);
          return options.fetchInvite
            ? options.fetchInvite(...args)
            : Response.json({ guild: { id: GUILD_ID }, expires_at: null });
        }),
    },
    "@/lib/supabase": {
      supabaseRequest: async (query, init = {}) => {
        calls.push({ query, ...init });
        if (init.method === "PATCH") {
          if (options.patchError) throw options.patchError;
          return [{ ...server, ...JSON.parse(init.body) }];
        }
        if (query.includes("discord_server_id=eq.")) return options.duplicates ?? [];
        return options.notOwner ? [] : [server];
      },
    },
  });
  return {
    calls,
    fetchCalls,
    post: (data) => route.POST(new Request("https://example.test/api/profile/update-server", {
      method: "POST",
      body: data,
    })),
  };
}

function locationFlag(response, name) {
  assert.equal(response.status, 303);
  return new URL(response.headers.get("location")).searchParams.get(name);
}

function patches(route) {
  return route.calls.filter((call) => call.method === "PATCH");
}

test("accepts existing Discord invite URL formats and rejects deceptive hosts or paths", () => {
  for (const url of [
    "https://discord.gg/new-invite",
    "http://discord.gg/new-invite",
    "https://www.discord.gg/new-invite/?utm_source=profile",
    "https://discord.com/invite/new-invite",
    "https://discordapp.com/invite/new-invite",
  ]) {
    assert.equal(inviteHelpers.getDiscordInviteCode(url), "new-invite");
  }
  for (const url of [
    "https://discord.gg.evil.test/new-invite",
    "https://evil.test/discord.gg/new-invite",
    "https://discord.gg@evil.test/new-invite",
    "https://user:pass@discord.gg/new-invite",
    "https://discord.gg:8443/new-invite",
    "https://discord.gg/new-invite/extra",
    "javascript:alert(1)",
    "",
  ]) {
    assert.equal(inviteHelpers.getDiscordInviteCode(url), null);
  }
});

test("saves a verified replacement invite and keeps both database queries scoped to its owner", async () => {
  const route = profileRoute();
  const response = await route.post(form({
    server_id: originalServer.id,
    invite_link: "https://discord.com/invite/new-invite",
  }));
  assert.equal(locationFlag(response, "saved"), "1");
  assert.equal(JSON.parse(patches(route)[0].body).invite_link, "https://discord.gg/new-invite");
  assert.match(route.calls[0].query, new RegExp(`owner_discord_user_id=eq.${OWNER_ID}`));
  assert.match(patches(route)[0].query, new RegExp(`owner_discord_user_id=eq.${OWNER_ID}`));
  assert.match(route.fetchCalls[0][0], /^https:\/\/discord.com\/api\/v10\/invites\/new-invite\?/);
});

test("legacy inviteLink fields still save verified invites", async () => {
  const route = profileRoute();
  const response = await route.post(form({ inviteLink: "https://discord.gg/new-invite" }));
  assert.equal(locationFlag(response, "saved"), "1");
  assert.equal(JSON.parse(patches(route)[0].body).invite_link, "https://discord.gg/new-invite");
});

test("unchanged expired links and older forms without invite fields allow unrelated edits", async () => {
  for (const inviteFields of [{}, { invite_link: originalServer.invite_link }]) {
    const route = profileRoute({ fetchInvite: () => { throw new Error("Must not fetch"); } });
    const response = await route.post(form({ server_name: "Updated name", ...inviteFields }));
    assert.equal(locationFlag(response, "saved"), "1");
    assert.equal(route.fetchCalls.length, 0);
    assert.equal(JSON.parse(patches(route)[0].body).server_name, "Updated name");
    assert.equal("invite_link" in JSON.parse(patches(route)[0].body), false);
  }
});

test("authentication and ownership failures stop before invite validation or mutation", async () => {
  for (const options of [{ session: null }, { notOwner: true }]) {
    const route = profileRoute(options);
    const response = await route.post(form({ invite_link: "https://discord.gg/new-invite" }));
    assert.equal(locationFlag(response, "error"), options.session === null ? "login" : "no_server");
    assert.equal(route.fetchCalls.length, 0);
    assert.equal(patches(route).length, 0);
    if (options.session === null) assert.equal(route.calls.length, 0);
  }
});

test("invalid, expired, unavailable, and mismatched replacement invites never update the listing", async () => {
  const scenarios = [
    { link: "https://evil.test/invite", error: "invalid_invite" },
    { fetchInvite: async () => new Response(null, { status: 404 }), error: "invalid_invite" },
    { fetchInvite: async () => Response.json({ guild: { id: GUILD_ID }, expires_at: "2000-01-01T00:00:00Z" }), error: "invalid_invite" },
    { fetchInvite: async () => Response.json({ type: 1 }), error: "invalid_invite" },
    { fetchInvite: async () => new Response(null, { status: 429 }), error: "invite_unavailable" },
    { fetchInvite: async () => { throw new Error("Network unavailable"); }, error: "invite_unavailable" },
    { fetchInvite: async () => Response.json({ guild: { id: OTHER_GUILD_ID } }), error: "invite_different_server" },
  ];
  for (const scenario of scenarios) {
    const route = profileRoute(scenario);
    const data = form({ invite_link: scenario.link ?? "https://discord.gg/new-invite" });
    data.set("banner", new File(["test"], "banner.png", { type: "image/png" }));
    const response = await route.post(data);
    assert.equal(locationFlag(response, "error"), scenario.error);
    assert.equal(patches(route).length, 0);
  }
});

test("manual listings recover the real guild ID and duplicate guilds are rejected", async () => {
  const server = { ...originalServer, discord_server_id: "manual-legacy" };
  const recovered = profileRoute({ server });
  const success = await recovered.post(form({ invite_link: "https://discord.gg/new-invite" }));
  assert.equal(locationFlag(success, "saved"), "1");
  assert.equal(JSON.parse(patches(recovered)[0].body).discord_server_id, GUILD_ID);
  assert.match(recovered.calls[1].query, /id=neq.server-1/);

  const duplicate = profileRoute({ server, duplicates: [{ id: "other-listing" }] });
  const response = await duplicate.post(form({ invite_link: "https://discord.gg/new-invite" }));
  assert.equal(locationFlag(response, "error"), "invite_server_conflict");
  assert.equal(patches(duplicate).length, 0);

  const raced = profileRoute({ server, patchError: new Error("23505 duplicate key") });
  const racedResponse = await raced.post(form({ invite_link: "https://discord.gg/new-invite" }));
  assert.equal(locationFlag(racedResponse, "error"), "invite_server_conflict");
});

test("historical guild aliases are checked before canonical ID recovery", async () => {
  for (const storedId of [undefined, "manual-legacy"]) {
    const server = { ...originalServer, discord_server_id: storedId, guildId: GUILD_ID };
    const different = profileRoute({
      server,
      fetchInvite: async () => Response.json({ guild: { id: OTHER_GUILD_ID } }),
    });
    const response = await different.post(form({ invite_link: "https://discord.gg/new-invite" }));
    assert.equal(locationFlag(response, "error"), "invite_different_server");
    assert.equal(patches(different).length, 0);
  }
});

function adminRoute() {
  const calls = [];
  const route = loadTs("app/api/admin/server-action/route.ts", {
    "next/server": { NextResponse: nextResponse() },
    "@/lib/admin": {
      getCurrentStaff: async () => ({ discord_user_id: OWNER_ID, username: "Staff", role: "admin" }),
      canApproveServers: () => true,
      canBumpBanServers: () => true,
      canModerateServers: () => true,
    },
    "@/lib/supabase": {
      supabaseRequest: async (query, init = {}) => {
        calls.push({ query, ...init });
        return init.method ? [] : [originalServer];
      },
    },
  });
  return {
    calls,
    post: (action, duration) => route.POST(new Request("https://example.test/api/admin/server-action", {
      method: "POST",
      body: form({ server_id: originalServer.id, action, duration, reason: "Example moderation reason" }),
    })),
  };
}

test("permanent bump bans stay active, can be removed, and do not change permanent lock semantics", async () => {
  const route = adminRoute();
  const response = await route.post("bump_ban", "permanent");
  assert.equal(locationFlag(response, "bump_ban"), "1");
  const ban = JSON.parse(patches(route)[0].body);
  assert.equal(ban.bump_banned_until, "9999-12-31T23:59:59.000Z");
  assert.ok(new Date(ban.bump_banned_until).getTime() > Date.now());

  await route.post("remove_bump_ban", "permanent");
  assert.equal(JSON.parse(patches(route)[1].body).bump_banned_until, null);
  await route.post("lock", "permanent");
  assert.equal(JSON.parse(patches(route)[2].body).moderation_until, null);
});
