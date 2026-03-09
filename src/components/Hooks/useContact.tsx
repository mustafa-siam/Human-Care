"use client";

import { useEffect, useState, useCallback } from "react";
import { getContacts, getContactById } from "@/app/ServerActions/contact";

export function useContacts(id?: string) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      if (id) {
        const res = await getContactById(id);
        if (res.success) setContact(res.data);
      } else {
        const res = await getContacts();
        if (res.success && res.data) {
          setContacts(res.data);
        }
      }
    } catch (error) {
      console.error("Fetch Contact Error:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    contacts,
    contact,
    loading,
    refresh: fetchData,
  };
}