import { MIN_BRUSH_SIZE } from "@/app/constants/tools";
import { create } from "zustand";

interface InPaintStore {
  brushSize: number;
  setBrushSize: (size: number) => void;
  lines: { points: number[] }[];
  setLines: (lines: { points: number[] }[]) => void;
  clearLines: () => void;
}

const useInPaintStore = create<InPaintStore>((set) => ({
  brushSize: MIN_BRUSH_SIZE,
  setBrushSize: (size) => set({ brushSize: size }),
  lines: [],
  setLines: (lines) => set({ lines }),
  clearLines: () => set({ lines: [] }),
}));

export default useInPaintStore;
