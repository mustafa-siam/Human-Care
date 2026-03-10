"use client";

import { getGalleryItems } from "@/app/ServerActions/galleryItem";
import { useEffect, useState, useCallback } from "react";

export function useGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getGalleryItems();

      if (res?.success) {
        setItems(res.data || []);
      } else {
        console.error(res?.error);
      }
    } catch (error) {
      console.error("Gallery Hook Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    loading,
    refresh: fetchData,
  };
}