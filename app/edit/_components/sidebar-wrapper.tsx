import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarWrapper = ({ children, className }: SidebarWrapperProps) => {
  return (
    <aside
      className={cn(
        "shrink-0 w-80 h-full rounded-xl overflow-hidden flex flex-col",
        "bg-gradient-to-b from-editor-surface-secondary/95 via-editor-surface-tertiary/90 to-editor-surface-secondary/95",
        "backdrop-blur-xl supports-[backdrop-filter]:bg-editor-surface-secondary/80",
        "border border-editor-border/60",
        "shadow-sm",
        "text-editor-text-strong",
        className,
      )}
    >
      <ScrollArea className="h-full">
        <div className="px-4 py-5">{children}</div>
      </ScrollArea>
    </aside>
  );
};

export default SidebarWrapper;
