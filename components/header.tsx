"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header
      className={cn(
        "flex items-center justify-between p-4  text-neutral-800 dark:text-black fixed top-0 left-0 right-0 rounded-none z-50 h-16 lg:inset-x-8 xl:inset-x-12"
      )}
    >
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        {/* <Image src={logo} alt="logo" width={48} height={48} /> */}
        <span className="font-semibold text-lg font-sans text-white">
          Picto AI
        </span>
      </Link>

      {/* user actions or profile avatar */}
      <div className="flex items-center gap-3">
        {/* <ThemeToggle /> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
