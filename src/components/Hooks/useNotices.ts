"use client";

import { useEffect, useState, useCallback } from "react";
import { getNotices, getNoticeBySlug } from "@/app/ServerActions/notice";

export function useNotices(slug?: string) {
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
        const res = await getNotices();
        if (res.success && res.data) {
          const all = res.data;
          setLatestNotices(all.filter((n: any) => n.latest === true));
          setNotices(all.filter((n: any) => n.latest !== true));
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { notices, latestNotices, notice, loading, refresh: fetchData };
}