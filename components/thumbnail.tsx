import { cn } from "@/lib/utils";
import { Image } from "@imagekit/next";

interface ThumbnailProps {
  name: string;
  picture?: string;
  isApplied: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Thumbnail = ({
  name,
  picture,
  isApplied,
  onClick,
  disabled = false,
}: ThumbnailProps) => {
  const baseClasses =
    "bg-zinc-800/50 group transition-all duration-300 ease-out backdrop-blur-sm border border-zinc-700/50 rounded-lg p-1 w-full shadow-md shadow-black/30";

  return (
    <div
      className={cn(baseClasses, {
        "hover:bg-zinc-800/80 hover:border-zinc-600/70 hover:shadow-lg hover:shadow-black/40 cursor-pointer":
          !disabled,
        "opacity-50 cursor-not-allowed": disabled,
        "active-effect brightness-110 border-cyan-400/80 shadow-cyan-500/30":
          isApplied && !disabled,
      })}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className="relative overflow-hidden rounded-md">
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
      {/* <p
        className={cn(
          "text-[11px] text-center font-medium truncate overflow-hidden leading-tight",
          isApplied && !disabled ? "text-black" : "text-zinc-300"
        )}
      >
        {name}
      </p> */}
    </div>
  );
};

export default Thumbnail;
