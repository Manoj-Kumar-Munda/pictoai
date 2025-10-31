"use client";
import AIEffectCard from "@/components/effect-card";
import { effects } from "@/constants/effects";
import Heading from "@/components/heading";

import EditTool from "@/components/edit-tool";
import { tools } from "@/constants/tools";
import sceneSwaps from "@/constants/scene-swaps";

const EditSidebar = () => {
  return (
    <aside className="h-full shrink-0 bg-black px-4 text-white space-y-2">
      <div className="space-y-1">
        <Heading>Tools</Heading>
        {tools.map((tool) => (
          <EditTool key={tool.name} {...tool} />
        ))}
      </div>
      <div className="space-y-1">
        <Heading>Trending</Heading>

        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-3 gap-y-4 gap-x-3.5">
            {effects.map((effect) => (
              <AIEffectCard key={effect.name} {...effect} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Heading>Scene Swaps</Heading>
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-3 gap-y-4 gap-x-3.5">
            {sceneSwaps.map((swap) => (
              <AIEffectCard key={swap.name} {...swap} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EditSidebar;
