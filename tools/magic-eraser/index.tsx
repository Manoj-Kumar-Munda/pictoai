import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from "@/constants/tools";
import useApplyEffect from "@/hooks/useSendChat";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import { mergeEraserMask } from "@/utils/merge-eraser-mask";
import { ArrowLeft, EraserIcon, Loader2, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

const MagicEraserPopup = () => {
  const { appliedTool: currentTool, setAppliedTool } = useEditingStore();
  const { brushSize, setBrushSize, lines } = useInPaintStore();
  const { handleSendMessage, status } = useApplyEffect();

  const isBusy = status === "streaming" || status === "submitted";
  const hasStrokes = lines.length > 0;

  const handleRemove = async () => {
    if (!currentTool || !hasStrokes) return;
    await mergeEraserMask();
    handleSendMessage(currentTool.prompt);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Back navigation */}
      <button
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer",
          "text-editor-text-secondary hover:text-editor-text-strong",
          "transition-colors duration-200 self-start group",
        )}
        onClick={() => setAppliedTool(null)}
      >
        <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back
      </button>

      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-editor-accent/15 to-editor-accent-light/15">
            <EraserIcon
              className="size-4 text-editor-accent-muted"
              strokeWidth={1.8}
            />
          </div>
          <h2 className="text-sm font-semibold text-editor-text-strong tracking-tight">
            AI Eraser
          </h2>
        </div>
        <p className="text-[11px] leading-relaxed text-editor-text-muted pl-[42px]">
          Paint over areas you want to remove, then hit the button below.
        </p>
      </div>

      {/* Brush size control */}
      <div
        className={cn(
          "rounded-xl p-3.5",
          "bg-editor-surface-tertiary/60",
          "border border-editor-border/40",
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Paintbrush
              className="size-3.5 text-editor-text-muted"
              strokeWidth={1.8}
            />
            <label className="text-[11px] font-medium text-editor-text-secondary uppercase tracking-wider">
              Brush Size
            </label>
          </div>
          <span className="text-xs font-semibold text-editor-text tabular-nums min-w-[2ch] text-right">
            {brushSize}
          </span>
        </div>

        <Slider
          min={MIN_BRUSH_SIZE}
          max={MAX_BRUSH_SIZE}
          value={[brushSize]}
          onValueChange={([value]) => setBrushSize(value)}
          step={1}
        />

        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-editor-text-muted tabular-nums">
            {MIN_BRUSH_SIZE}
          </span>
          <span className="text-[10px] text-editor-text-muted tabular-nums">
            {MAX_BRUSH_SIZE}
          </span>
        </div>
      </div>

      {/* Action button */}
      <Button
        className={cn(
          "w-full gap-2 rounded-xl py-5 text-xs font-semibold cursor-pointer",
          "bg-gradient-to-r from-editor-action to-editor-action-deep",
          "hover:from-editor-action-hover hover:to-editor-action",
          "text-white shadow-md shadow-editor-action/20",
          "hover:shadow-lg hover:shadow-editor-action/30",
          "transition-all duration-300 hover:-translate-y-[1px]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md",
        )}
        onClick={handleRemove}
        disabled={isBusy || !hasStrokes}
      >
        {isBusy ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Removing…
          </>
        ) : (
          <>
            <EraserIcon className="size-3.5" strokeWidth={2} />
            Remove Painted Area
          </>
        )}
      </Button>

      {/* Hint when no strokes */}
      {!hasStrokes && !isBusy && (
        <p className="text-[10px] text-editor-text-muted text-center leading-relaxed animate-in fade-in duration-300">
          Paint on the image to select areas for removal
        </p>
      )}
    </div>
  );
};

export default MagicEraserPopup;
