import AIEffectCard from "@/components/effect-card";
import { effects } from "@/app/constants/effects";

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
