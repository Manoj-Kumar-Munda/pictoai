"use client";

import { DraggableEffectsCard } from "@/components/draggable-effects-card";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex items-center justify-between  flex-col pt-20">
      <div className=" space-y-2 lg:space-y-4 xl:space-y-8 ">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance font-bold text-center tracking-tighter leading-tight md:leading-tight lg:leading-16 xl:leading-20 font-inter"
        >
          Transform your photos
          <br /> with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-600  via-blue-500 to-blue-800">
            AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-neutral-500  text-xs sm:text-sm  md:text-base max-w-xl xl:max-w-2xl mx-auto"
        >
          Unlock professional-grade editing with a single click. Effortlessly
          remove backgrounds, generate stunning outfits, and enhance details
          instantly.
        </motion.p>
      </div>

      <DraggableEffectsCard />
    </div>
  );
}
