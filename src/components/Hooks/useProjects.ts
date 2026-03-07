"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getProjects,
  getProjectBySlug,
} from "@/app/ServerActions/project";

export function useProjects(slug?: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      if (slug) {
        const res = await getProjectBySlug(slug);
        if (res.success) {
          setProject(res.data ?? null);
        }
      } else {
        const res = await getProjects();
        if (res.success) {
          setProjects(res.data ?? []);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { projects, project, loading, refresh: fetchData };
}