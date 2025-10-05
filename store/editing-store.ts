//make a zustand store for editing - store the image, the applied effects, the result of the editing so that we can undo and redo the editing
import { create } from "zustand";

interface EditingStore {
  image: {
    
    url: string;
    width: number;
    height: number;
  };
  appliedEffects: string[];
  result: string;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  setImage: (imageUrl: string, width?: number, height?: number) => void;
  setAppliedEffects: (effects: string[]) => void;
  setResult: (result: string) => void;
}

const useEditingStore = create<EditingStore>((set) => ({
  image: {
    url: "",
    width: 0,
    height: 0,
  },
  appliedEffects: [],
  result: "",
  undo: () => {},
  redo: () => {},
  clear: () => {},
  setImage: (imageUrl, width = 600, height = 400) =>
    set({ image: { url: imageUrl, width, height } }),
  setAppliedEffects: (effects) => set({ appliedEffects: effects }),
  setResult: (result) => set({ result }),
}));

export default useEditingStore;
