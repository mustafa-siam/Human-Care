"use client";

import { useEffect, useState, useCallback } from "react";
import { getProjects, getProjectBySlug } from "@/app/ServerActions/project";

export function useProjects(slug?: string, trashed: boolean = false) {
  const [projects, setProjects] = useState<any[]>([]);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (slug) {
        const res = await getProjectBySlug(slug);
        if (res.success) setProject(res.data ?? null);
      } else {
        // Make sure `trashed` is explicitly passed
        const res = await getProjects(trashed); 
        if (res.success) setProjects(res.data ?? []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [slug, trashed]); // dependency must include trashed

  // Re-fetch if trashed or slug changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { projects, project, loading, refresh: fetchData };
}