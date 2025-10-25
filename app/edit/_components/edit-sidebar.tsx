import AIEffectCard from "@/components/effect-card";
import { effects } from "@/app/constants/effects";
import Heading from "@/components/heading";
import { tools } from "@/app/constants/tools";

const EditSidebar = () => {
  return (
    <aside className="h-full shrink-0 bg-black px-4 text-white">
      <div className="space-y-1">
        <Heading>Tools</Heading>
        {tools.map((tool) => (
          <AIEffectCard key={tool.name} {...tool} />
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
    </aside>
  );
};

export default EditSidebar;
