import useApplyEffect from "@/hooks/useApplyEffect";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import { EraserIcon } from "lucide-react";

const MIN_BRUSH_SIZE = 5;
const MAX_BRUSH_SIZE = 100;

const MagicEraserPopup = () => {
  const { appliedTool: currentTool, image, setImage } = useEditingStore();
  const { brushSize, setBrushSize } = useInPaintStore();
  const { handleSendMessage, status } = useApplyEffect();

  const handleRemove = () => {
    if (!image || !currentTool) return;
    handleSendMessage(currentTool.prompt);
  };

  return (
    <div className="absolute top-4 left-4 bg-white shadow p-4 z-10 rounded-md max-w-72 ">
      <h3 className="text-primary font-semibold text-sm">Magic Eraser</h3>
      <p className="text-[10px] text-neutral-500 font-medium">
        {currentTool?.description}
      </p>

      <div className="flex flex-col  pt-2">
        <label className="block mt-2 text-xs text-neutral-500 font-medium ">
          Brush size
        </label>
        <input
          type="range"
          min={MIN_BRUSH_SIZE}
          max={MAX_BRUSH_SIZE}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-full "
        />
        <span className="ml-auto text-xs font-medium">{brushSize}</span>
      </div>

      <button
        className="mt-2 flex gap-2 w-full active-effect text-xs font-semibold items-center justify-center py-1.5 rounded text-neutral-700 cursor-pointer hover:brightness-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRemove}
        disabled={status === "streaming" || status === "submitted"}
      >
        <EraserIcon className="size-4" />
        {status === "streaming" || status === "submitted" ? "Removing..." : "Remove"}
      </button>
    </div>
  );
};

export default MagicEraserPopup;
