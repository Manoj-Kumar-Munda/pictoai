import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface ThumbnailProps {
  name: string;
  picture?: StaticImageData;
  isApplied: boolean;
  onClick: () => void;
}

const Thumbnail = ({ name, picture, isApplied, onClick }: ThumbnailProps) => {
  return (
    <div
      className={cn(
        "bg-neutral-600/70 group hover:bg-neutral-500/80 transition-colors duration-300 backdrop-blur-sm border border-primary p-1 cursor-pointer w-fit rounded-md",
        isApplied && "active-effect"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {picture ? (
        <Image
          src={picture}
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 object-cover object-top overflow-hidden rounded transition-all duration-300 group-hover:brightness-110"
        />
      ) : (
        <div className="size-20 bg-neutral-600" />
      )}
      {/* <p className="text-[10px] text-center font-medium text-secondary">
        {name}
      </p> */}
    </div>
  );
};

export default Thumbnail;
