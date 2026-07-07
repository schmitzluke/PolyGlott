import { redirect } from "next/navigation";

/** Alte URL: weiterleiten auf den freien Lehrer-Anruf. */
export default function LiveIndexPage() {
  redirect("/chat/live/hoca");
}
