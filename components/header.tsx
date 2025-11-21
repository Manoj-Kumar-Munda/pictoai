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
        "max-w-7xl mx-auto flex items-center justify-between px-4 border border-neutral-100 rounded-full py-3 sm:p-4 fixed inset-x-0 z-50 h-14 sm:h-16 top-0 bg-white/30 backdrop-blur-sm",
        !isHome && "inset-x-0 xl:inset-x-0 lg:inset-x-0 bg-black text-white"
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
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
