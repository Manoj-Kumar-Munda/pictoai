"use client";
import AIEffectCard from "@/components/effect-card";
import { effects, filterEffects, Restyles } from "@/constants/effects";
import Heading from "@/components/heading";

import EditTool from "@/components/edit-tool";
import { tools } from "@/constants/tools";
import useEditingStore from "@/store/editing-store";
import MagicEraserPopup from "@/tools/magic-eraser";
import SidebarWrapper from "./sidebar-wrapper";

const EditSidebar = () => {
  const appliedTool = useEditingStore((state) => state.appliedTool);

  if (appliedTool) {
    return (
      <SidebarWrapper>
        {appliedTool?.tool_id === "eraser" && <MagicEraserPopup />}
      </SidebarWrapper>
    );
  }
  return (
    <SidebarWrapper>
      <div className="space-y-2">
        <Heading className="border-b border-zinc-800/50 pb-1">Tools</Heading>
        <div className="flex flex-col gap-1.5">
          {tools.map((tool) => (
            <EditTool key={tool.name} {...tool} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Heading className="border-b border-zinc-800/50 pb-1">Filters</Heading>
        <div className="">
          <div className="grid grid-cols-3 gap-2">
            {filterEffects.map((effect) => (
              <AIEffectCard key={effect.name} {...effect} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <Heading className="border-b border-zinc-800/50 pb-1.5">
          Aesthetics
        </Heading>
        <div className="overflow-y-auto max-h-[40vh]">
          <div className="grid grid-cols-3 gap-2">
            {effects.map((swap) => (
              <AIEffectCard key={swap.name} {...swap} />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <Heading className="border-b border-zinc-800/50 pb-1.5">
          Restyle
        </Heading>
        <div className="overflow-y-auto max-h-[40vh]">
          <div className="grid grid-cols-3 gap-2">
            {Restyles.map((restyle) => (
              <AIEffectCard key={restyle.name} {...restyle} />
            ))}
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default EditSidebar;
