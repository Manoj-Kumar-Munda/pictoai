import { DraggableCardBody } from "./ui/draggable-card";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-slate-300 to-transparent h-svh ">
      <div className="flex flex-col items-center justify-center lg:py-30 lg:gap-20 ">
        <h1 className="text-6xl text-balance font-bold text-center tracking-tight text-neutral-800 dark:text-white">
          Transform your images <br />
          with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-rose-400 to-blue-500   ">
            AI
          </span>{" "}
          tools
        </h1>

        <div className="">
          <DraggableCardBody />
        </div>
      </div>
    </section>
  );
};

export default Hero;
