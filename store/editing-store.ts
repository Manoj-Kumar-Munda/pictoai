import { type EffectProps } from "@/types";
import { create } from "zustand";

interface EditingStore {
  image: {
    url: string;
    width: number;
    height: number;
  };
  appliedEffect: EffectProps | null;
  result: string;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  setImage: (imageUrl: string, width?: number, height?: number) => void;
  setAppliedEffect: (effect: EffectProps) => void;
  setResult: (result: string) => void;
}

const useEditingStore = create<EditingStore>((set) => ({
  image: {
    url: "",
    width: 0,
    height: 0,
  },
  appliedEffect: null,
  result: "",
  undo: () => {},
  redo: () => {},
  clear: () => {},
  setImage: (imageUrl, width = 600, height = 400) =>
    set({ image: { url: imageUrl, width, height } }),

  setAppliedEffect: (effect) => set({ appliedEffect: effect }),
  setResult: (result) => set({ result }),
}));

export default useEditingStore;
