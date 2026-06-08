import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

export async function GET() {
  try {
    const servers = await supabaseRequest("servers?select=*");

    const premiumServers = (servers || [])
      .filter((server: any) => server.approved !== false)
      .filter(
        (server: any) =>
          server.premiumStatus === true ||
          server.premium_status === true ||
          server.partnerStatus === true ||
          server.partner_status === true
      );

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
