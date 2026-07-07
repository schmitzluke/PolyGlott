import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ChatRoom } from "./ChatRoom";
import { SCENARIOS } from "../../../../../content/scenarios";

export default async function ChatScenarioPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const scenario = SCENARIOS.find((s) => s.id === params.id);
  if (!scenario) notFound();

  return (
    <ChatRoom
      scenario={{
        id: scenario.id,
        title: scenario.title,
        level: scenario.level,
        description: scenario.description,
        opener: scenario.opener,
        openerTranslation: scenario.openerTranslation,
      }}
    />
  );
}
