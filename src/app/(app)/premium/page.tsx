import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PaywallCard } from "./PaywallCard";

/** Paywall: Free vs. Premium. Zahlung nur als Stub (Testmodus). */
export default async function PremiumPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <PaywallCard isPremium={user.isPremium} />;
}
