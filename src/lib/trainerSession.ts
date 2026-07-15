import type { FrequencyWord } from "../../content/frequency-tr";

export interface TrainerExercise {
  id: string;
  german: string;
  turkish: string;
  rank: number;
}

export function buildPackSession(pack: FrequencyWord[]): TrainerExercise[] {
  return pack.map((word) => ({
    id: `card-${word.rank}`,
    german: word.source,
    turkish: word.target,
    rank: word.rank,
  }));
}
