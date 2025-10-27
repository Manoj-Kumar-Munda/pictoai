import { create } from "zustand";

interface InPaintStore {
  brushSize: number;
  setBrushSize: (size: number) => void;
  lines: { points: number[] }[];
  setLines: (lines: { points: number[] }[]) => void;
}

const useInPaintStore = create<InPaintStore>((set) => ({
  brushSize: 30,
  setBrushSize: (size) => set({ brushSize: size }),
  lines: [],
  setLines: (lines) => set({ lines }),
}));

export default useInPaintStore;
