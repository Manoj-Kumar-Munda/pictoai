import { type EffectProps } from "@/types";
import { nanoid } from "nanoid";
import {
  EFFECTS_LIGHTING_PROMPTS,
  RESTYLE
} from "./prompts";

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
    name: "Chiaroscuro",
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

const Restyles: EffectProps[] = [
  {
    id: nanoid(),
    name: "Focused Beam",
    picture: `/PictoAI/red-focused-beam.png`,
    prompt: RESTYLE.teal_background,
    category: "lighting",
  },
];

const filterEffects: EffectProps[] = [
  {
    id: nanoid(),
    name: "Cyberpunk",
    picture: "/PictoAI/cyberpunk_neon_noir.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.Cyberpunk_Neon_Noir,
    category: "filter",
  },
  {
    id: nanoid(),
    name: "Golden Hour",
    picture: "/PictoAI/golden_hour.png",
    prompt: EFFECTS_LIGHTING_PROMPTS.Golden_hour,
    category: "filter",
  },
];

export { effects, filterEffects, Restyles };
