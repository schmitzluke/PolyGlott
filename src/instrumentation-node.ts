// Node-only Instrumentation-Code, ausgelagert damit die Edge-Runtime-Kompilierung
// von instrumentation.ts node-cron (nutzt node:crypto/child_process) nicht bündelt.
export async function registerNode() {
  const cron = await import("node-cron");
  const { runStashClassification } = await import("@/lib/stashClassifierWorker");

  // Täglich um 03:00 Uhr Server-Zeit.
  cron.schedule("0 3 * * *", () => {
    runStashClassification().catch((err) =>
      console.error("[stashClassifierWorker] Cron-Lauf fehlgeschlagen:", err)
    );
  });

  console.log("[instrumentation] stashClassifierWorker Cron registriert (täglich 03:00).");
}
