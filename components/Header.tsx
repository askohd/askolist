import HeaderClient from "./HeaderClient";
import { getCurrentAdmin } from "@/lib/admin";

export default async function Header() {
  const admin = await getCurrentAdmin();

  return <HeaderClient isAdmin={Boolean(admin)} />;
}
