import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ensureApiKey } from "@/lib/apiKey";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const apiKey = await ensureApiKey(user.id);

  return (
    <SettingsForm
      initial={{
        name: user.name ?? "",
        dailyGoalXp: user.dailyGoalXp,
        notifications: user.notifications,
        targetLanguage: user.targetLanguage,
        isPremium: user.isPremium,
        email: user.email,
        apiKey,
      }}
    />
  );
}
