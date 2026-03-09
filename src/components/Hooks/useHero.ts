"use client";

import { getHeroContent } from "@/app/ServerActions/Hero";
import { useEffect, useState } from "react";

interface HeroData {
  badgeText: string;
  headline: string;
  description: string;
  livesImpacted: string;
  projectsCount: string;
  yearsActive: string;
  images: string[];
}

export function useHero() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHeroContent();
        setHero(data);
      } catch (error) {
        console.error("Failed to fetch hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { hero, loading };
}