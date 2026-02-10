import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      className={cn(
        "shrink-0 w-80 rounded-xl overflow-hidden",
        "bg-gradient-to-b from-editor-surface-secondary/80 via-editor-surface-tertiary/60 to-editor-surface-secondary/80",
        "border border-editor-border/50",
        "backdrop-blur-xl",
        "shadow-sm",
        "px-4 py-4 text-editor-text",
      )}
    >
      <ScrollArea className="h-full">{children}</ScrollArea>
    </aside>
  );
};

export default SidebarWrapper;
