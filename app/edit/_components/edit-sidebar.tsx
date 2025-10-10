"use client";
import effect1 from "@/app/assets/ai_effects/lightings/black-white-studio.png";
import AIEffectCard from "@/components/effect-card";
import effect2 from "@/app/assets/ai_effects/lightings/low-key.png";
import { EFFECTS_LIGHTING_PROMPTS } from "@/app/constants/prompts";
import { nanoid } from "nanoid";
import { type IEffect } from "@/types";

const effects: IEffect[] = [
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
    prompt: "Low-key lighting",
  },
];

const EditSidebar = () => {
  return (
    <aside className="h-full shrink-0 bg-black px-4 text-white">
      <h2 className="text-lg font-semibold">Trending </h2>

      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-y-4 gap-x-3.5">
          {effects.map((effect) => (
            <AIEffectCard key={effect.name} {...effect} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default EditSidebar;
