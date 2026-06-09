import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseRequest } from "@/lib/supabase";

function redirectToServer(request: Request, serverId: string, query: string) {
  return NextResponse.redirect(
    new URL(`/servers/${serverId}?${query}`, request.url),
    { status: 303 }
  );
}

function isAdminUser(user: any) {
  const adminEmails = String(process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = String(user?.email || "").toLowerCase();

  return Boolean(
    user?.role === "admin" ||
      user?.isAdmin ||
      user?.is_admin ||
      user?.admin ||
      user?.staff ||
      user?.is_staff ||
      user?.permissions?.includes?.("admin") ||
      (userEmail && adminEmails.includes(userEmail))
  );
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await request.formData();

    const reviewId = String(formData.get("review_id") ?? "").trim();
    const serverId = String(formData.get("server_id") ?? "").trim();

    if (!serverId) {
      return NextResponse.redirect(
        new URL("/servers?error=no_server", request.url),
        { status: 303 }
      );
    }

    if (!session?.user) {
      return redirectToServer(request, serverId, "error=login_required");
    }

    if (!isAdminUser(session.user as any)) {
      return redirectToServer(request, serverId, "error=not_admin");
    }

    if (!reviewId) {
      return redirectToServer(request, serverId, "error=no_review");
    }

    const reviewRows = await supabaseRequest(
      `reviews?id=eq.${reviewId}&server_id=eq.${serverId}&select=*`
    );

    if (!reviewRows?.[0]) {
      return redirectToServer(request, serverId, "error=review_not_found");
    }

    await supabaseRequest(`reviews?id=eq.${reviewId}&server_id=eq.${serverId}`, {
      method: "PATCH",
      body: JSON.stringify({
        hidden: true,
        deleted_by_admin: true,
        updated_at: new Date().toISOString(),
      }),
    });

    return redirectToServer(request, serverId, "review_deleted=1");
  } catch (error) {
    console.error("Admin review delete error:", error);

    return NextResponse.redirect(
      new URL("/servers?error=delete_review_failed", request.url),
      { status: 303 }
    );
  }
}
