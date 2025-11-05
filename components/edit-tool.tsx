"use client";

import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { ToolProps } from "@/types";

const EditTool = (tool: ToolProps) => {
  const { icon: Icon, name } = tool;
  const { setAppliedTool } = useEditingStore();
  const activeTool = useEditingStore((state) => state.appliedTool);

  const handleClick = () => {
    setAppliedTool(tool);
  };
  return (
    <div
      role="button"
      aria-pressed={activeTool?.name === name}
      tabIndex={0}

      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer relative",
        "bg-zinc-800/80 hover:bg-zinc-800/70 border border-zinc-700/50 hover:border-zinc-600/70",
        "transition-all duration-300 ease-out backdrop-blur-sm group",
        "shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30",
        activeTool?.name === name &&
          "active-effect text-black border-cyan-400/80 shadow-cyan-500/20"
      )}
      onClick={handleClick}
    >
      {Icon ? (
        <Icon
          strokeWidth={2.5}
          className={cn(
            "size-5 transition-transform duration-300 group-hover:scale-110",
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
  );
};

export default EditTool;
