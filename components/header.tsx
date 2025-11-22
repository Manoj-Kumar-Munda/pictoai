"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
    <motion.header
      animate={{
        width: isScrolled ? (isMobile ? "90%" : "80%") : "100%",
        y: isScrolled ? 8 : 0,
        border: isScrolled ? "1px solid rgba(200,200,200,0.2)" : "none",
        borderRadius: isScrolled ? "999px" : "0",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-4 md:pl-8 py-3 fixed inset-x-0 z-50 h-14 sm:h-16 top-0 bg-white/30 dark:bg-white/10 backdrop-blur-sm",        !isHome && "inset-x-0 xl:inset-x-0 lg:inset-x-0 bg-black text-white"
      )}
    >
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        {/* <Image src={logo} alt="logo" width={48} height={48} /> */}
        <span className={cn("font-semibold text-base sm:text-lg font-sans ")}>
          Picto <span className="gradient-text font-bold">AI</span>
        </span>
      </Link>

      {/* profile avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* <ThemeToggle /> */}
        {/* <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
        <Button className="bg-blue-600 rounded-full text-white">
          Get started
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
