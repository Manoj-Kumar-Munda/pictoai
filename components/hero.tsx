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
    <section className="h-svh flex items-end justify-start relative overflow-hidden bg-neutral-800 ">
      {/* Animated Background Image Slideshow */}
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
            className="w-full h-full"
            style={{
              background: `url(${images[currentIndex].src}) no-repeat center center/cover`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="flex flex-col items-start justify-end lg:pb-10 xl:pb-30 gap-8 lg:pl-12  xl:pl-16 z-10 ">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:text-6xl  xl:text-7xl text-balance font-bold text-start tracking-tight text-neutral-100 dark:text-white lg:leading-16 xl:leading-20"
        >
          Transform your images
          <br /> with AI tools
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-medium text-sm  text-neutral-100 max-w-xl text-start lg:pl-2"
        >
          Elevate your visuals with our AI-powered image transformation tools.
          Get trending effects and styles in seconds.
        </motion.p>
      </div>
      <div className="absolute xl:bottom-30 lg:bottom-10 xl:right-16 lg:right-12 z-50  ">
        <div className="bg-white/10 backdrop-blur-md border-0 border-neutal-900/40 overflow-hidden rounded-full flex gap-1">
          <ul className="flex ">
            {filters.map((filter, index) => (
              <li
                role="tab"
                key={index}
                className={cn(
                  "px-4 py-2.5 text-xs cursor-pointer relative font-medium transition-colors duration-300 hover:text-white",
                  index === currentIndex ? "text-white" : "text-white/60"
                )}
                onClick={() => setCurrentIndex(index)}
              >
                {index === currentIndex && (
                  <motion.span
                    layoutId="index"
                    className="absolute inset-0 rounded-full bg-white/20"
                  />
                )}
                <span>{filter}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
