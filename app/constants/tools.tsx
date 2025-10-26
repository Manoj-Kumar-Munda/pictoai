import { ToolProps } from "@/types";
import { nanoid } from "nanoid";
import { TOOLS_PROMPTS } from "./prompts";
import { EraserIcon } from "lucide-react";

export const tools: ToolProps[] = [
  {
    id: nanoid(),
    name: "AI Eraser",
    tool_id: "eraser",
    icon: EraserIcon,
    prompt: TOOLS_PROMPTS.magic_eraser,
  },
];
