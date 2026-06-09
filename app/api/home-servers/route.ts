import { NextResponse } from "next/server";
import { supabaseRequest } from "@/lib/supabase";

export async function GET() {
  try {
    const servers = await supabaseRequest(
      "servers?approved=eq.true&status=eq.approved&select=*"
    );

    return NextResponse.json({
      servers: servers || [],
    });
  } catch (error) {
    console.error("Home servers error:", error);

    return NextResponse.json(
      {
        servers: [],
        error: "Home servers could not be loaded",
      },
      { status: 500 }
    );
  }
}
