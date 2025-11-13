import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 xl:py-20 xl:space-y-10">
        <h2 className="text-5xl font-bold">Explore powerful AI tools</h2>

        <div className="flex">
          <div className="border w-72 h-80 relative"
            style={{
              backgroundImage: ""
            }}
           
           >
            <h3 className="left-2 bottom-2 font-geist-sans absolute font-bold">
              AI Eraser
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
