import { EffectProps } from "@/types";
import { nanoid } from "nanoid";
import { SCENE_SWAP_PROMPTS } from "./prompts";

const sceneSwaps: EffectProps[] = [
  {
    id: nanoid(),
    name: "Focused Beam",
    picture: `/PictoAI/red-focused-beam.png`,
    prompt: SCENE_SWAP_PROMPTS.teal_background,
  },
];

export default sceneSwaps;
