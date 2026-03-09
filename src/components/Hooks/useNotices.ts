// hooks/useNotices.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { getNotices, getNoticeBySlug } from "@/app/ServerActions/notice";

export function useNotices(slug?: string, trashed: boolean = false) {
  const [notices, setNotices] = useState<any[]>([]);
  const [latestNotices, setLatestNotices] = useState<any[]>([]);
  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (slug) {
        const res = await getNoticeBySlug(slug);
        if (res.success) setNotice(res.data);
      } else {
        const res = await getNotices(trashed); // pass trashed flag
        if (res.success && res.data) {
          const all = res.data;

          if (!trashed) {
            // Normal view: split latest and others
            setLatestNotices(all.filter((n: any) => n.latest === true));
            setNotices(all.filter((n: any) => n.latest !== true));
          } else {
            // Trash view: show everything together
            setNotices(all);
            setLatestNotices([]);
          }
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [slug, trashed]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { notices, latestNotices, notice, loading, refresh: fetchData };
}