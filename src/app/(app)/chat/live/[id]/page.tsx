import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LiveCall } from "../LiveCall";
import { SCENARIOS } from "../../../../../../content/scenarios";

/** Anruf-Modus: frei mit Hoca („hoca“) oder in jedem Szenario. */
export default async function LiveCallPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (params.id === "hoca") {
    return (
      <LiveCall
        scenarioId="hoca"
        title="Live-Unterricht mit Hoca"
        description="Freies Gespräch mit deinem Türkischlehrer über Alltag, Pläne und alles, was dich beschäftigt."
        userName={user.name}
        level={user.selfLevel}
      />
    );
  }

  const scenario = SCENARIOS.find((s) => s.id === params.id);
  if (!scenario) notFound();

  return (
    <LiveCall
      scenarioId={scenario.id}
      title={scenario.title}
      description={scenario.description}
      userName={user.name}
      level={user.selfLevel}
    />
  );
}
