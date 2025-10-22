import { type EffectProps } from "@/types";
import { nanoid } from "nanoid";
import { EFFECTS_LIGHTING_PROMPTS } from "./prompts";
import effect1 from "@/app/assets/ai_effects/lightings/black-white-studio.png";
import effect2 from "@/app/assets/ai_effects/lightings/low-key.png";
import effect3 from "@/app/assets/ai_effects/lightings/neon-noir.png";

const effects: EffectProps[] = [
  {
    id: nanoid(),
    name: "Window Stripe",
    demo: effect1,
    prompt: EFFECTS_LIGHTING_PROMPTS.stripped_shadow,
  },
  {
    id: nanoid(),
    name: "Low-key",
    demo: effect2,
    prompt: EFFECTS_LIGHTING_PROMPTS.low_key,
  },
  {
    id: nanoid(),
    name: "Neon Noir",
    demo: effect3,
    prompt: EFFECTS_LIGHTING_PROMPTS.neon_noir,
  },
];

export { effects };
