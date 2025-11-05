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
        "bg-zinc-800/50 group hover:bg-zinc-800/80 transition-all duration-300 ease-out backdrop-blur-sm",
        "border border-zinc-700/50 hover:border-zinc-600/70 rounded-lg p-1.5 cursor-pointer w-full",
        "shadow-md shadow-black/30 hover:shadow-lg hover:shadow-black/40",
        isApplied && "active-effect brightness-110 border-cyan-400/80 shadow-cyan-500/30"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-md mb-1">
        {picture ? (
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
            src={picture}
            alt={name}
            width={80}
            height={80}
            loading="lazy"
            transformation={[{ width: 400, height: 400 }]}
            className="w-full h-16 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-16 bg-zinc-700/50 rounded-md" />
        )}
      </div>
      <p className={cn(
        "text-[11px] text-center font-medium truncate overflow-hidden leading-tight",
        isApplied ? "text-black" : "text-zinc-300"
      )}>
        {name}
      </p>
    </div>
  );
};

export default Thumbnail;
