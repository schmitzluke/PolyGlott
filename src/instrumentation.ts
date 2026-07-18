// Next.js Instrumentation Hook: läuft einmal beim Server-Start (App-Prozess),
// nicht im Edge-Runtime. Registriert den nächtlichen Stash-Insel-Klassifikations-Job.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerNode } = await import("./instrumentation-node");
    await registerNode();
  }
}
