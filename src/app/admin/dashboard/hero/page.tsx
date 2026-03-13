
import HeroForm from "@/components/Admin/HeroForm";
import { db } from "@/lib/db";

export default async function AdminHeroPage() {
  const heroData = await db.heroContent.findFirst();
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Edit Hero Section</h1>
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8">
         <HeroForm initialData={heroData} />
      </div>
    </div>
  );
}