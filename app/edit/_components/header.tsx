import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white fixed top-0 left-0 right-0 z-50 h-20">
      {/*logo */}
      <Link href="/">
        <span>Picto AI</span>
      </Link>

      {/* navigation */}

      {/* user actions or profile avatar */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;