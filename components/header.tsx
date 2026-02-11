"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        initial={false}
        animate={{
          width: isScrolled ? (isMobile ? "95%" : "80%") : "100%",
          y: isScrolled ? 8 : 0,
          borderRadius: isScrolled ? 999 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 28,
          mass: 0.8,
        }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-4 md:pl-6 h-14 sm:h-16 border border-black",
          "backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          "max-w-7xl w-full mx-auto will-change-transform bg-primary dark:bg-primary",
          isScrolled
            ? "border border-gray-200/60 dark:border-white/10 bg-white/40 dark:bg-white/10"
            : "border border-transparent bg-transparent dark:bg-transparent",
        )}
      >
        {/*logo */}
        <Link href="/" className="flex gap-2 items-center">
          <span
            className={cn(
              "font-bold text-base sm:text-xl font-sans text-primary",
            )}
          >
            Picto <span className="gradient-text font-bold">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {/* <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
          <Button className="bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-300">
            Get started
          </Button>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
