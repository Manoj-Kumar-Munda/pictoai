import { type EffectProps } from "@/types";
import { nanoid } from "nanoid";
import { EFFECTS_LIGHTING_PROMPTS } from "./prompts";

const effects: EffectProps[] = [
  {
    id: nanoid(),
    name: "Window Stripe",
    picture: `/PictoAI/black-white-studio.png`,
    prompt: EFFECTS_LIGHTING_PROMPTS.stripped_shadow,
  },
  {
    id: nanoid(),
    name: "Low-key",
    picture: "/PictoAI/low-key.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.low_key,
  },
  {
    id: nanoid(),
    name: "Neon Noir",
    picture: "/PictoAI/neon-noir.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.neon_noir,
  },
  {
    id: nanoid(),
    name: "Golden Silhouette",
    picture: "/PictoAI/golden.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.Golden_Silhouette,
  },
];

export { effects };
