import { cn } from "@/lib/utils";
import { Image } from "@imagekit/next";

interface ThumbnailProps {
  name: string;
  picture?: string;
  isApplied: boolean;
  onClick: () => void;
}

const Thumbnail = ({ name, picture, isApplied, onClick }: ThumbnailProps) => {
  return (
    <div
      className={cn(
        "bg-neutral-600/70 group hover:bg-neutral-500/80 transition-colors duration-300 backdrop-blur-sm border border-primary p-1 cursor-pointer w-fit",
        isApplied && "active-effect brightness-110"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {picture ? (
        <Image
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
          src={picture}
          alt={name}
          width={80}
          height={80}
          loading="lazy"
          transformation={[{ width: 400, height:400}]}
          className="w-20 h-20 object-cover overflow-hidden"
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
