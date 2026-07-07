"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

export function FollowButton({ 
  userId, 
  initialIsFollowing 
}: { 
  userId: string; 
  initialIsFollowing: boolean;
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleFollow = async () => {
    setLoading(true);
    try {
      const method = isFollowing ? "DELETE" : "POST";
      const res = await fetch(`/api/users/${userId}/follow`, {
        method,
      });

      if (res.ok) {
        setIsFollowing(!isFollowing);
        router.refresh(); // Refresh to update followers count if any
      }
    } catch (error) {
      console.error("Failed to toggle follow", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-colors ${
        isFollowing
          ? "bg-ink-200 text-ink-700 hover:bg-ink-300 dark:bg-ink-800 dark:text-ink-200"
          : "bg-brand-500 text-white hover:bg-brand-600"
      }`}
    >
      <Users className="w-4 h-4" />
      {loading ? "Wird geladen..." : isFollowing ? "Folge ich" : "Folgen"}
    </button>
  );
}
