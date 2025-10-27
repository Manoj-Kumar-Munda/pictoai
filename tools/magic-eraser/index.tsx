import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import { EraserIcon } from "lucide-react";

const MIN_BRUSH_SIZE = 5;
const MAX_BRUSH_SIZE = 100;

const MagicEraserPopup = () => {
  const currentTool = useEditingStore((state) => state.appliedTool);
  const { brushSize, setBrushSize } = useInPaintStore();
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

      <button className="mt-2 flex gap-2 w-full active-effect text-xs font-semibold items-center justify-center py-1.5 rounded text-neutral-700 cursor-pointer hover:brightness-90 transition-all duration-300">
        <EraserIcon className="size-4" />
        Remove
      </button>
    </div>
  );
};

export default MagicEraserPopup;
