import { DraggableEffectsCard } from "@/components/draggable-effects-card";

export default function Home() {
  return (
    <div className="flex items-center justify-between  flex-col pt-20">
      <div className=" space-y-2 lg:space-y-4 xl:space-y-8 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-balance font-bold text-center tracking-tight leading-tight md:leading-tight lg:leading-16 xl:leading-20">
          Transform your photos
          <br /> with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-blue-600  via-blue-500 to-blue-800">
            AI magic
          </span>
        </h1>

        <p className="text-center text-neutral-500 font-medium text-sm  xl:text-lg max-w-xl xl:max-w-2xl mx-auto">
          Unlock professional-grade editing with a single click. Effortlessly
          remove backgrounds, generate stunning outfits, and enhance details
          instantly.
        </p>
      </div>

      <DraggableEffectsCard />
    </div>
  );
}
