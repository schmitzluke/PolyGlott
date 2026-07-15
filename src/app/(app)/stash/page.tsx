import { VoiceCaptureStash } from "@/components/VoiceCaptureStash";

export default function StashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-ink-50 p-6">
      <div className="mx-auto max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-h3 font-bold text-ink-900">Sätze lernen</h1>
          <p className="text-body text-ink-600">Sprich einen deutschen Satz. Wir übersetzen ihn ins Türkische.</p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lifted">
          <VoiceCaptureStash />
        </div>
      </div>
    </div>
  );
}
