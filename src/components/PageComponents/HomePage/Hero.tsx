"use client"
import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { ImagePosition } from "@/components/Hooks/ImagePosition";
import { useHero } from "@/components/Hooks/useHero";

export function Hero() {
  const { hero, loading } = useHero();

if (loading || !hero) return null;
  const {
    badgeText,
    headline,
    description,
    livesImpacted,
    projectsCount,
    yearsActive,
    images,
  } = hero;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-32 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#10B981]" fill="#10B981" />
              <span className="text-[#10B981] text-sm">{badgeText}</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight">
              {headline}
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                Donate Now
                <Heart className="w-5 h-5" fill="white" />
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold flex items-center gap-2"
              >
                Our Work
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
              <div>
                <div className="text-3xl text-[#10B981] mb-1">
                  {livesImpacted}
                </div>
                <div className="text-white/60 text-sm">Lives Impacted</div>
              </div>

              <div>
                <div className="text-3xl text-[#10B981] mb-1">
                  {projectsCount}
                </div>
                <div className="text-white/60 text-sm">Projects</div>
              </div>

              <div>
                <div className="text-3xl text-[#10B981] mb-1">
                  {yearsActive}
                </div>
                <div className="text-white/60 text-sm">Years Active</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE IMAGES */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[600px]">
              <div className="col-span-4 row-span-4 rounded-2xl overflow-hidden">
                <ImagePosition
                  src={images[0]}
                  alt="Hero Image 1"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden">
                <ImagePosition
                  src={images[1]}
                  alt="Hero Image 2"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden">
                <ImagePosition
                  src={images[2]}
                  alt="Hero Image 3"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
                <ImagePosition
                  src={images[3]}
                  alt="Hero Image 4"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden">
                <ImagePosition
                  src={images[4]}
                  alt="Hero Image 5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}