"use client";

import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { ToolProps } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditTool = (tool: ToolProps) => {
  const { icon: Icon, name, description } = tool;
  const { toggleAppliedTool } = useEditingStore();
  const activeTool = useEditingStore((state) => state.appliedTool);
  const imageUrl = useEditingStore((state) => state.image.url);
  const isDisabled = !imageUrl;

  const isActive = activeTool?.name === name;

  const handleClick = () => {
    if (isDisabled) return;
    toggleAppliedTool(tool);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="button"
          aria-pressed={isActive}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(
            "relative flex items-center gap-3 px-4 py-3 rounded-xl",
            "bg-editor-surface/80",
            "border border-editor-border/80",
            "backdrop-blur-md",
            "transition-all duration-300 ease-out",
            "shadow-sm",
            "group",
            !isDisabled && [
              "cursor-pointer",
              "hover:bg-editor-surface",
              "hover:border-editor-border-hover",
              "hover:shadow-md hover:shadow-black/5",
              "hover:-translate-y-[1px]",
            ],
            isDisabled && "opacity-40 cursor-not-allowed grayscale",
            isActive &&
              !isDisabled && [
                "!bg-editor-accent-subtle",
                "!border-editor-accent/40",
                "!shadow-lg !shadow-editor-accent/10",
                "ring-1 ring-editor-accent/20",
              ],
          )}
          onClick={() => {
            handleClick();
          }}
        >
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-500 ease-out",
              isActive && !isDisabled
                ? "h-6 bg-gradient-to-b from-editor-accent via-editor-accent-light to-editor-accent-deep opacity-100 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                : "h-0 bg-editor-accent opacity-0",
            )}
          />

          {Icon ? (
            <div
              className={cn(
                "relative flex items-center justify-center size-8 rounded-lg transition-all duration-300",
                isActive && !isDisabled
                  ? "bg-gradient-to-br from-editor-accent/20 to-editor-accent-light/20"
                  : "bg-editor-surface-tertiary/80 group-hover:bg-editor-surface-hover/80",
              )}
            >
              <Icon
                strokeWidth={1.8}
                className={cn(
                  "size-4 transition-all duration-300",
                  "group-hover:scale-110",
                  isActive
                    ? "text-editor-accent-muted"
                    : "text-editor-text-secondary group-hover:text-editor-text-strong",
                )}
              />

              {isActive && !isDisabled && (
                <div className="absolute inset-0 rounded-lg bg-editor-accent/10 animate-pulse" />
              )}
            </div>
          ) : null}

          <div className="flex flex-col min-w-0">
            <span
              className={cn(
                "font-semibold text-sm leading-tight transition-colors duration-300",
                isActive
                  ? "text-editor-accent-text"
                  : "text-editor-text group-hover:text-editor-text-strong",
              )}
            >
              {name}
            </span>
            {description && (
              <span
                className={cn(
                  "text-[11px] leading-snug mt-0.5 transition-colors duration-300 line-clamp-1",
                  isActive
                    ? "text-editor-accent-muted/70"
                    : "text-editor-text-muted group-hover:text-editor-text-secondary",
                )}
              >
                {description}
              </span>
            )}
          </div>

          {isActive && !isDisabled && (
            <div className="ml-auto flex items-center">
              <div className="size-2 rounded-full bg-gradient-to-r from-editor-accent to-editor-accent-light shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
            </div>
          )}

          {!isDisabled && !isActive && (
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          )}
        </div>
      </TooltipTrigger>
      {isDisabled && (
        <TooltipContent sideOffset={6}>
          Upload an image to enable tools
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default EditTool;
