"use client";

import { useState } from "react";
import { VoiceCaptureStash } from "@/components/VoiceCaptureStash";
import { StashList } from "@/components/StashList";
import { StashManualAdd } from "@/components/StashManualAdd";

type StashItem = {
  id: string;
  germanOriginal: string;
  turkishTranslation: string | null;
  status: string;
};

export function StashPageClient({ initialSentences }: { initialSentences: StashItem[] }) {
  const [sentences, setSentences] = useState(initialSentences);

  return (
    <>
      <div className="rounded-xl bg-white p-8 shadow-lifted">
        <VoiceCaptureStash />
      </div>

      <StashManualAdd onAdded={(s) => setSentences((prev) => [s, ...prev])} />

      <StashList sentences={sentences} setSentences={setSentences} />
    </>
  );
}
