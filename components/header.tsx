"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 py-3 sm:p-4 fixed top-0 inset-x-0 rounded-none z-50 h-14 sm:h-16 lg:inset-x-8 xl:inset-x-12",
        !isHome && "inset-x-0 xl:inset-x-0 lg:inset-x-0 bg-black"
      )}
    >
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        {/* <Image src={logo} alt="logo" width={48} height={48} /> */}
        <span
          className={cn(
            "font-semibold text-base sm:text-lg font-sans text-white"
          )}
        >
          Picto AI
        </span>
      </Link>

      {/* profile avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* <ThemeToggle /> */}
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
