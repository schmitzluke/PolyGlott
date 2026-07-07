import {
  BookOpen,
  Brain,
  Flame,
  Medal,
  Mountain,
  PartyPopper,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/**
 * Mappt die in der DB gespeicherten Achievement-Icons (Emoji-Codes)
 * auf professionelle Lucide-Icons – ohne Datenmigration.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  "🎉": PartyPopper,
  "📚": BookOpen,
  "🔥": Flame,
  "🌋": Mountain,
  "🧠": Brain,
  "🏆": Trophy,
  "⭐": Star,
  "🏅": Medal,
};

export function AchievementIcon({ icon, className = "h-7 w-7" }: { icon: string; className?: string }) {
  const Icon = ICON_MAP[icon] ?? Trophy;
  return <Icon aria-hidden className={`${className} text-gold`} />;
}
