"use client";
import { useState, useEffect } from "react";
import img1 from "@/public/model.jpg";
import img2 from "@/public/model-1.png";
import img3 from "@/public/model-2.png";
import img4 from "@/public/model-3.png";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const images = [img1, img2, img3, img4];

const filters = ["Original", "Neon Noir", "Golden hour", "Urban grit"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-svh flex flex-col relative overflow-hidden bg-neutral-800 ">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${images[currentIndex].src})`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:from-black/50 sm:via-transparent z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative lg:absolute z-10 pt-16 sm:pt-20 lg:pt-0 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center lg:justify-end lg:bottom-10 xl:bottom-30 lg:right-12 xl:right-16"
      >
        <div className="bg-white/10 backdrop-blur-md border-0 border-neutal-900/40 overflow-hidden rounded-full inline-flex gap-1">
          <ul className="flex overflow-x-auto scrollbar-hide">
            {filters.map((filter, index) => (
              <li
                role="tab"
                key={index}
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs cursor-pointer relative font-medium transition-colors duration-300 hover:text-white whitespace-nowrap",
                  index === currentIndex ? "text-white" : "text-white/60"
                )}
                onClick={() => setCurrentIndex(index)}
              >
                {index === currentIndex && (
                  <motion.span
                    layoutId="filter-tab"
                    className="absolute inset-0 rounded-full bg-white/20"
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="flex flex-col items-start justify-end flex-1 pb-10 lg:pb-16 xl:pb-30 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:pl-12 xl:pl-16 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance font-bold text-start tracking-tight text-neutral-100 dark:text-white leading-tight md:leading-tight lg:leading-16 xl:leading-20"
        >
          Transform your images
          <br /> with AI tools
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-medium text-xs sm:text-sm text-neutral-100 max-w-xl text-start lg:pl-2"
        >
          Elevate your visuals with our AI-powered image transformation tools.
          Get trending effects and styles in seconds.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
