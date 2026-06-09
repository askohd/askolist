import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

function isEnabled(value: any) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function getTimeValue(value: string | null | undefined) {
  if (!value) return 0;

  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) {
    return 0;
  }

  return time;
}

function isPremiumOrPartner(server: any) {
  return (
    isEnabled(server.premium_status) ||
    isEnabled(server.premiumStatus) ||
    isEnabled(server.partner_status) ||
    isEnabled(server.partnerStatus)
  );
}

export async function GET() {
  try {
    const servers = await supabaseRequest(
      "servers?approved=eq.true&status=eq.approved&select=*"
    );

    const premiumServers = Array.isArray(servers)
      ? servers
          .filter(isPremiumOrPartner)
          .sort((a: any, b: any) => {
            const aBump = getTimeValue(a.last_bump);
            const bBump = getTimeValue(b.last_bump);

            if (aBump !== bBump) {
              return bBump - aBump;
            }

            return getTimeValue(b.created_at) - getTimeValue(a.created_at);
          })
      : [];

    return NextResponse.json({
      servers: premiumServers,
    });
  } catch (error) {
    console.error("Premium servers error:", error);

    return NextResponse.json(
      {
        servers: [],
        error: "Premium servers could not be loaded",
      },
      { status: 500 }
    );
  }
}
