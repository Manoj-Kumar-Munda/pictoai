import { Button } from "@/components/ui/button";
import useEditingStore from "@/store/editing-store";

const ZoomButton = () => {
  const { zoom, zoomIn, zoomOut } = useEditingStore();

  return (
    <div className="absolute bottom-4 right-4 bg-accent rounded-2xl flex gap-2 z-10 items-center">
      <Button
        variant="default"
        size="icon"
        className="cursor-pointer bg-gray-100 text-neutral-500 font-bold hover:bg-gray-200 transition-all duration-300"
        onClick={zoomIn}
      >
        +
      </Button>
      <span className="text-xs font-bold text-neutral-500 ">
        {zoom.toFixed(1)}
      </span>
      <Button
        variant="default"
        size="icon"
        onClick={zoomOut}
        className="cursor-pointer bg-gray-100 transition-all duration-300 hover:bg-gray-200 text-neutral-500 font-bold"
      >
        -
      </Button>
    </div>
  );
};

export default ZoomButton;
