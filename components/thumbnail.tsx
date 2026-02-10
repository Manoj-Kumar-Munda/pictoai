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
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden transition-all duration-300 ease-out",
        "bg-editor-surface/60",
        "border border-editor-border/60",
        "backdrop-blur-sm shadow-sm",
        !disabled && [
          "cursor-pointer",
          "hover:shadow-md hover:shadow-black/8",
          "hover:border-editor-border-hover/80",
          "hover:-translate-y-0.5",
        ],
        disabled && "opacity-35 cursor-not-allowed grayscale",
        isApplied &&
          !disabled && [
            "!border-editor-accent/60",
            "!shadow-md !shadow-editor-accent/15",
            "ring-1 ring-editor-accent/25",
          ],
      )}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className="relative overflow-hidden">
        {picture ? (
          <Image
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
            src={picture}
            alt={name}
            width={80}
            height={80}
            loading="lazy"
            transformation={[{ width: 400, height: 400 }]}
            className="w-full h-[72px] object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-16 bg-editor-surface-tertiary" />
        )}

        {!disabled && !isApplied && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {isApplied && !disabled && (
          <div className="absolute inset-0 bg-gradient-to-t from-editor-accent/20 via-editor-accent/5 to-transparent" />
        )}

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300",
            isApplied && !disabled
              ? "bg-gradient-to-r from-editor-accent via-editor-accent-light to-editor-accent-deep opacity-100"
              : "bg-transparent opacity-0",
          )}
        />
      </div>

      <div className="px-1.5 py-1.5">
        <p
          className={cn(
            "text-[10px] text-center font-medium truncate leading-tight transition-colors duration-300",
            isApplied && !disabled
              ? "text-editor-accent-text"
              : "text-editor-text-muted group-hover:text-editor-text",
          )}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default Thumbnail;
