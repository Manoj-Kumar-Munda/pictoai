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
  const { icon: Icon, name } = tool;
  const { setAppliedTool } = useEditingStore();
  const activeTool = useEditingStore((state) => state.appliedTool);
  const imageUrl = useEditingStore((state) => state.image.url);
  const isDisabled = !imageUrl;

  const handleClick = () => {
    if (isDisabled) return;
    setAppliedTool(tool);
  };
  const baseClasses =
    "flex items-center gap-3 px-4 py-2 rounded-lg relative bg-zinc-800/80 border border-zinc-700/50 transition-all duration-300 ease-out backdrop-blur-sm group shadow-lg shadow-black/20";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="button"
          aria-pressed={activeTool?.name === name}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(baseClasses, {
            "cursor-pointer hover:bg-zinc-800/70 hover:border-zinc-600/70 hover:shadow-xl hover:shadow-black/30":
              !isDisabled,
            "opacity-50 cursor-not-allowed": isDisabled,
            "active-effect text-black border-cyan-400/80 shadow-cyan-500/20":
              activeTool?.name === name && !isDisabled,
          })}
          onClick={() => {
            if (isDisabled) return;
            handleClick();
          }}
        >
          {Icon ? (
            <Icon
              strokeWidth={2}
              className={cn(
                "size-4.5 transition-transform duration-300 group-hover:scale-110",
                activeTool?.name === name ? "text-black" : "text-zinc-300"
              )}
            />
          ) : null}
          <span
            className={cn(
              "font-semibold text-sm",
              activeTool?.name === name ? "text-black" : "text-zinc-200"
            )}
          >
            {name}
          </span>
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
