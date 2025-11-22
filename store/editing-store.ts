import { ImageProps, type EffectProps, type ToolProps } from "@/types";
import { create } from "zustand";

interface EditingStore {
  image: ImageProps;
  appliedEffect: EffectProps | null;
  appliedTool: ToolProps | null;
  result: string;
  zoom: number;
  isProcessing: boolean;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  setImage: (imageUrl: string, width?: number, height?: number) => void;
  setAppliedEffect: (effect: EffectProps) => void;
  toggleAppliedTool: (tool: ToolProps) => void;
  setResult: (result: string) => void;
  setZoom: (zoom: number) => void;
  setProcessing: (isProcessing: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setAppliedTool: (tool: ToolProps | null) => void;
}

const useEditingStore = create<EditingStore>((set) => ({
  image: {
    url: "",
    width: 0,
    height: 0,
  },
  appliedEffect: null,
  appliedTool: null,
  result: "",
  zoom: 1,
  isProcessing: false,
  undo: () => {},
  redo: () => {},
  clear: () => {},
  setImage: (imageUrl, width = 600, height = 400) =>
    set({ image: { url: imageUrl, width, height } }),

  setAppliedEffect: (effect) => set({ appliedEffect: effect }),
  toggleAppliedTool: (tool) =>
    set((state) => ({
      appliedTool: state.appliedTool?.name === tool.name ? null : tool,
    })),
  setResult: (result) => set({ result }),
  setZoom: (zoom) => set({ zoom }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  zoomIn: () => set((state) => ({ zoom: state.zoom + 0.1 })),
  zoomOut: () => set((state) => ({ zoom: Math.max(state.zoom - 0.1, 0.1) })),
  setAppliedTool: (tool) => set({ appliedTool: tool }),
}));

export default useEditingStore;
