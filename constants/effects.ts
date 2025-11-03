import { type EffectProps } from "@/types";
import { nanoid } from "nanoid";
import { EFFECTS_LIGHTING_PROMPTS } from "./prompts";

const effects: EffectProps[] = [
  {
    id: nanoid(),
    name: "Window stripe",
    picture: "/PictoAI/black-white-studio.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.stripped_shadow,
    category: "lighting",
  },
  {
    id: nanoid(),
    name: "Low-key",
    picture: "/PictoAI/low-key.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.low_key,
    category: "lighting",
  },
  {
    id: nanoid(),
    name: "Neon Noir",
    picture: "/PictoAI/neon-noir.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.neon_noir,
    category: "lighting",
  },
  {
    id: nanoid(),
    name: "Mystery face",
    picture: "/PictoAI/golden.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.Golden_Silhouette,
    category: "lighting",
  },
  {
    id: nanoid(),
    name: "Purple Spot",
    picture: "/PictoAI/Purple_Spotlight.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.Purple_Spotlight,
    category: "lighting",
  },
];

export { effects };
