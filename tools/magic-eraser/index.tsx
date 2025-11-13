import { Slider } from "@/components/ui/slider";
import { MAX_BRUSH_SIZE, MIN_BRUSH_SIZE } from "@/constants/tools";
import useApplyEffect from "@/hooks/useSendChat";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import { EraserIcon } from "lucide-react";

const MagicEraserPopup = () => {
  const { appliedTool: currentTool } = useEditingStore();
  const { brushSize, setBrushSize } = useInPaintStore();
  const { handleSendMessage, status } = useApplyEffect();

  const handleRemove = () => {
    if (!currentTool) return;
    handleSendMessage(currentTool.prompt);
  };

  return (
    <div className="absolute top-4 left-4 bg-gray-100 shadow p-4 z-10 rounded-md max-w-72 ">
      <h3 className="text-primary font-semibold text-sm ">Magic Eraser</h3>
      <p className="text-[10px] text-neutral-500 font-medium">
        {currentTool?.description}
      </p>

      <div className="flex flex-col  pt-2">
        <label className="block mt-2 text-xs text-neutral-700 font-medium ">
          Brush size
        </label>

        <Slider
          defaultValue={[brushSize]}
          onValueChange={(value) => setBrushSize(value[0])}
          min={MIN_BRUSH_SIZE}
          max={MAX_BRUSH_SIZE}
          step={5}
          className="w-full mt-2"
          trackClassName="bg-gray-300"
          thumbClassName="bg-gray-100 border-gray-100 shadow-md border border-neutral-400"
        />
        <span className="ml-auto text-xs font-medium text-neutral-700">
          {brushSize}
        </span>
      </div>

      <button
        className="mt-2 flex gap-2 w-full bg-primary text-xs font-semibold items-center justify-center py-1.5 rounded text-secondary cursor-pointer hover:brightness-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRemove}
        disabled={status === "streaming" || status === "submitted"}
      >
        <EraserIcon className="size-4" />
        {status === "streaming" || status === "submitted"
          ? "Removing..."
          : "Remove"}
      </button>
    </div>
  );
};

export default MagicEraserPopup;
