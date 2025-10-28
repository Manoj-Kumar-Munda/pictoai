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
      tabIndex={0}
      className={cn(
        "flex gap-2 p-1.5 rounded w-fit cursor-pointer bg-neutral-600/70 hover:bg-neutral-500/80 transition-colors duration-300 backdrop-blur-sm",
        activeTool?.name === name && "active-effect text-black"
      )}
      onClick={handleClick}
    >
      {Icon ? <Icon strokeWidth={3} className="size-4" /> : null}
      <span className="font-semibold text-[10px]">{name}</span>
    </div>
  );
};

export default EditTool;
