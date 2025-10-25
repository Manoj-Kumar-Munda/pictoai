import { EffectProps } from "@/types";
import { nanoid } from "nanoid";
import { TOOLS_PROMPTS } from "./prompts";

export const tools: EffectProps[] = [
  {
    id: nanoid(),
    name: "Eraser",
    // demo: null,
    prompt: TOOLS_PROMPTS.magic_eraser,
  },
];
