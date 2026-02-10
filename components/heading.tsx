import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h2
      className={cn(
        "flex items-center gap-2 font-semibold text-[11px] uppercase tracking-[0.15em] text-editor-text-muted font-geist-sans select-none",
        className,
      )}
    >
      <span>{children}</span>
      <span className="flex-1 h-px bg-gradient-to-r from-editor-border to-transparent" />
    </h2>
  );
};

export default Heading;
