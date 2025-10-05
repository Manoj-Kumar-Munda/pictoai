"use client";
import effect1 from "@/app/assets/ai_effects/lightings/black-white-studio.png";
import { StaticImageData } from "next/image";
import AIEffectCard from "@/components/effect-card";
import effect2 from "@/app/assets/ai_effects/lightings/low-key.png";

const effects: { name: string; demo: StaticImageData }[] = [
  {
    name: "Studio",
    demo: effect1,
  },
  {
    name: "Low-key",
    demo: effect2,
  },
];

const EditSidebar = () => {
  return (
    <aside className="h-full shrink-0 bg-black px-4 text-white">
      <h2 className="text-lg font-semibold">AI Effects</h2>

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
