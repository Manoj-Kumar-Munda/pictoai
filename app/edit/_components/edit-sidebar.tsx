"use client";
import AIEffectCard from "@/components/effect-card";
import { effects } from "@/constants/effects";
import Heading from "@/components/heading";

import EditTool from "@/components/edit-tool";
import { tools } from "@/constants/tools";
import sceneSwaps from "@/constants/scene-swaps";

const EditSidebar = () => {
  return (
    <aside className="h-full shrink-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-r border-zinc-800/50 px-4 py-4 text-white space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <div className="space-y-2">
        <Heading className="border-b border-zinc-800/50 pb-1">Tools</Heading>
        <div className="flex flex-col gap-1.5">
          {tools.map((tool) => (
            <EditTool key={tool.name} {...tool} />
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Heading className="border-b border-zinc-800/50 pb-1">Lightings</Heading>
        <div className="">
          <div className="grid grid-cols-3 gap-2">
            {effects.map((effect) => (
              <AIEffectCard key={effect.name} {...effect} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <Heading className="border-b border-zinc-800/50 pb-1.5">Aesthetics</Heading>
        <div className="overflow-y-auto max-h-[40vh]">
          <div className="grid grid-cols-3 gap-2">
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
