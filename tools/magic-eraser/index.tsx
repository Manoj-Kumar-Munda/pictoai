import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from "@/constants/tools";
import useApplyEffect from "@/hooks/useSendChat";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import { ArrowLeft, EraserIcon } from "lucide-react";

const MagicEraserPopup = () => {
  const { appliedTool: currentTool, setAppliedTool } = useEditingStore();
  const { brushSize, setBrushSize } = useInPaintStore();
  const { handleSendMessage, status } = useApplyEffect();

  const handleRemove = () => {
    if (!currentTool) return;
    handleSendMessage(currentTool.prompt);
  };

  return (
    <div className="space-y-1">
      {/* back button */}
      <button
        className="flex items-center gap-1 text-xs font-semibold mb-4 cursor-pointer"
        onClick={() => setAppliedTool(null)}
      >
        <ArrowLeft className="size-4" />
        Back
      </button>
      <Heading className="text-white">AI Eraser</Heading>
      <p className="text-[10px] font-medium text-neutral-400">
        Paint over areas to remove that item from the image. Use the slider to
        set the brush size
      </p>

      <div className="flex flex-col">
        <label className="block mt-2 text-xs text-neutral-200 font-medium ">
          Brush size
        </label>

        <Slider
          min={MIN_BRUSH_SIZE}
          max={MAX_BRUSH_SIZE}
          value={[brushSize]}
          onValueChange={([value]) => setBrushSize(value)}
          step={1}
          className="mt-2"
        />

        <span className="ml-auto text-xs font-medium">{brushSize}</span>
      </div>

      <Button
        className="mt-4 flex gap-2 w-full text-xs font-semibold items-center justify-center rounded text-white cursor-pointer hover:brightness-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
        onClick={handleRemove}
        disabled={status === "streaming" || status === "submitted"}
      >
        <EraserIcon className="size-4" />
        {status === "streaming" || status === "submitted"
          ? "Removing..."
          : "Remove"}
      </Button>
    </div>
  );
};

export default MagicEraserPopup;
