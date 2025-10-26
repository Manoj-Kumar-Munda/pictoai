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
        "bg-neutral-200 border p-0.5 cursor-pointer w-fit ",
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
          className="w-20 h-20 object-cover object-top"
        />
      ) : (
        <div className="size-20 bg-neutral-600" />
      )}
      <p className="text-[10px] text-center font-medium text-neutral-800">
        {name}
      </p>
    </div>
  );
};

export default Thumbnail;
