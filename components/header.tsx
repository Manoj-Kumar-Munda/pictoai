"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header
      className={cn(
        "flex items-center justify-between p-4 bg-white/30 backdrop-blur-md text-neutral-800 dark:text-black fixed top-4 left-4 right-4 rounded-full z-50 h-16"
      )}
    >
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        {/* <Image src={logo} alt="logo" width={48} height={48} /> */}
        <span className="font-bold font-sans ">Picto AI</span>
      </Link>

      {/* navigation */}

      {/* user actions or profile avatar */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
