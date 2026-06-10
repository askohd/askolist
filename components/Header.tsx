import HeaderClient from "./HeaderClient";
import { getCurrentStaff } from "@/lib/admin";

export default async function Header() {
  const staff = await getCurrentStaff();

  return <HeaderClient isAdmin={Boolean(staff)} />;
}
