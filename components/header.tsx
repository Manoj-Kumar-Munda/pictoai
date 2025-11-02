import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black  text-white fixed top-0 left-0 right-0 z-50 h-16">
      {/*logo */}
      <Link href="/" className="flex gap-2 items-center">
        <Image src={logo} alt="logo" width={48} height={48} />
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
