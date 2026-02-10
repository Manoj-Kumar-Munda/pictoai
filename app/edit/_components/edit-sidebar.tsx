"use client";
import AIEffectCard from "@/components/effect-card";
import { effects, filterEffects, Restyles } from "@/constants/effects";
import Heading from "@/components/heading";

import EditTool from "@/components/edit-tool";
import { tools } from "@/constants/tools";
import useEditingStore from "@/store/editing-store";
import MagicEraserPopup from "@/tools/magic-eraser";
import SidebarWrapper from "./sidebar-wrapper";
import { EffectProps } from "@/types";

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
      <div className="space-y-5">
        <div className="space-y-2.5">
          <Heading>Tools</Heading>
          <div className="flex flex-col gap-2">
            {tools.map((tool) => (
              <EditTool key={tool.name} {...tool} />
            ))}
          </div>
        </div>

        <Category title="Filters" effects={filterEffects} />

        <Category title="Effects" effects={effects} />

        <Category title="Restyle" effects={Restyles} />
      </div>
    </SidebarWrapper>
  );
};

const Category = ({
  title,
  effects,
}: {
  title: string;
  effects: EffectProps[];
}) => {
  return (
    <div className="space-y-2.5">
      <Heading>{title}</Heading>
      <div className="grid grid-cols-3 gap-2">
        {effects.map((effect) => (
          <AIEffectCard key={effect.name} {...effect} />
        ))}
      </div>
    </div>
  );
};

export default EditSidebar;
