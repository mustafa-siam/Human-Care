"use client";

import { useEffect, useState, useCallback } from "react";
import { getTeamMembers, getTeamMemberBySlug } from "@/app/ServerActions/team";

export function useTeam(slug?: string) {
  const [team, setTeam] = useState<any[]>([]);
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (slug) {
        const res = await getTeamMemberBySlug(slug);
        if (res.success) {
          setMember(res.data ?? null);
        }
      } else {
        const res = await getTeamMembers();
        if (res.success) {
          // Fallback to empty array if data is null
          setTeam(res.data ?? []);
        }
      }
    } catch (error) {
      console.error("Hook Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { team, member, loading, refresh: fetchData };
}