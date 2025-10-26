import { ToolProps } from "@/types";

const EditTool = ({ icon: Icon, name, tool_id }: ToolProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex gap-2 bg-neutral-200/30 p-2 rounded w-fit"
    >
      {Icon ? <Icon className="size-4" /> : null}
      <span className="font-semibold text-xs">{name}</span>
    </div>
  );
};

export default EditTool;
