import { cookies } from "next/headers";
import ReferralInvitePopup from "@/components/ReferralInvitePopup";

type LanguageCode = "de" | "en" | "fr" | "it" | "pl";

type SearchParamsValue = string | string[] | undefined;

type SubmitSuccessPageProps = {
  searchParams?:
    | Promise<Record<string, SearchParamsValue>>
    | Record<string, SearchParamsValue>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://www.askocafe.com";

function normalizeLanguage(value: string | undefined): LanguageCode {
  if (
    value === "de" ||
    value === "en" ||
    value === "fr" ||
    value === "it" ||
    value === "pl"
  ) {
    return value;
  }

  return "de";
}

async function resolveSearchParams(searchParams: SubmitSuccessPageProps["searchParams"]) {
  return await Promise.resolve(searchParams ?? {});
}

function getSearchParam(
  searchParams: Record<string, SearchParamsValue>,
  key: string
) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

export default async function SubmitSuccessPage({
  searchParams,
}: SubmitSuccessPageProps) {
  const cookieStore = await cookies();
  const pageLanguage = normalizeLanguage(cookieStore.get("asko_language")?.value);
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const referralCode = getSearchParam(resolvedSearchParams, "referral_code");
  const botInviteUrl = getSearchParam(resolvedSearchParams, "bot_invite_url");
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const referralUrl = `${baseUrl}/submit?ref=${encodeURIComponent(referralCode)}`;

  return (
    <main className="submit-success-page">
      <style>{`
        .submit-success-page {
          min-height: 100vh;
          padding: 70px 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          background:
            radial-gradient(circle at 0% 20%, rgba(139, 92, 246, 0.35), transparent 34%),
            radial-gradient(circle at 100% 12%, rgba(85, 214, 255, 0.24), transparent 30%),
            linear-gradient(135deg, #06000d 0%, #12051f 48%, #102236 100%);
        }
      `}</style>

      <ReferralInvitePopup
        language={pageLanguage}
        referralCode={referralCode}
        referralUrl={referralUrl}
        botInviteUrl={botInviteUrl}
      />
    </main>
  );
}
