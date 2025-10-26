import { ToolProps } from "@/types";

const EditTool = ({ icon: Icon, name, tool_id }: ToolProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex gap-2 p-1.5 rounded w-fit cursor-pointer bg-neutral-600/70 hover:bg-neutral-500/80 transition-colors duration-300 backdrop-blur-sm"
    >
      {Icon ? (
        <Icon strokeWidth={3} className="size-4 text-secondary" />
      ) : null}
      <span className="font-semibold text-[10px] text-secondary">{name}</span>
    </div>
  );
};

export default EditTool;
