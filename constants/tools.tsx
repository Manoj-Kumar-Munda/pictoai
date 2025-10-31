import { ToolProps } from "@/types";
import { nanoid } from "nanoid";
import { TOOLS_PROMPTS } from "./prompts";
import { EraserIcon } from "lucide-react";

export const MIN_BRUSH_SIZE = 30;
export const MAX_BRUSH_SIZE = 100;
export const tools: ToolProps[] = [
  {
    id: nanoid(),
    name: "AI Eraser",
    tool_id: "eraser",
    icon: EraserIcon,
    prompt: TOOLS_PROMPTS.magic_eraser,
    description:
      "Paint over areas to remove that item from the image. Use the slider to set the brush size.",
  },
];
