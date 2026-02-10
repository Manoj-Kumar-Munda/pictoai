import { Button } from "@/components/ui/button";
import useEditingStore from "@/store/editing-store";
import { Minus, Plus } from "lucide-react";

const ZoomButton = () => {
  const { zoom, zoomIn, zoomOut } = useEditingStore();

  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-editor-surface-tertiary/80 border border-editor-border/60 p-1 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-lg cursor-pointer text-editor-text-secondary hover:text-editor-text-strong hover:bg-editor-surface-hover/80 transition-all duration-200"
        onClick={zoomOut}
      >
        <Minus className="size-3.5" strokeWidth={2.5} />
      </Button>
      <span className="text-[11px] font-semibold text-editor-text-secondary w-10 text-center tabular-nums select-none">
        {Math.round(zoom * 100)}%
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-lg cursor-pointer text-editor-text-secondary hover:text-editor-text-strong hover:bg-editor-surface-hover/80 transition-all duration-200"
        onClick={zoomIn}
      >
        <Plus className="size-3.5" strokeWidth={2.5} />
      </Button>
    </div>
  );
};

export default ZoomButton;
