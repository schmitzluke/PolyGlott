import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <SettingsForm
      initial={{
        name: user.name ?? "",
        dailyGoalXp: user.dailyGoalXp,
        notifications: user.notifications,
        targetLanguage: user.targetLanguage,
        isPremium: user.isPremium,
        email: user.email,
      }}
    />
  );
}
