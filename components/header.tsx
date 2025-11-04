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
        "flex items-center justify-between p-4 fixed top-0 inset-x-0 rounded-none z-50 h-16 lg:inset-x-8 xl:inset-x-12",
        !isHome && "xl:inset-x-2 lg:inset-x-2"
      )}
    >
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        {/* <Image src={logo} alt="logo" width={48} height={48} /> */}
        <span
          className={cn(
            "font-semibold text-lg font-sans text-white",
            !isHome && " text-neutral-800"
          )}
        >
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
