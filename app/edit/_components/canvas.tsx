import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";

const ImageEditorCanvas = ({ imgSrc }: { imgSrc: HTMLImageElement }) => {
  const [image, setImage] = useState<HTMLImageElement>(imgSrc);
  const [zoom, setZoom] = useState<number>(0.2);
  const [stageWidth, setStageWidth] = useState<number>(800);
  const [stageHeight, setStageHeight] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setStageWidth(containerRef.current.offsetWidth);
      setStageHeight(containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full relative">
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            <Image
              image={image}
              width={image.width}
              height={image.height}
              scaleX={zoom}
              scaleY={zoom}
              x={(stageWidth - image.width * zoom) / 2}
              y={(stageHeight - image.height * zoom) / 2}
              draggable
            />
          </Layer>
        </Stage>

        {/* zoom buttons + and - */}
        <div className="absolute bottom-4 right-4 bg-foreground rounded-2xl flex gap-2 items-center">
          <Button
            variant="default"
            size="icon"
            onClick={() => setZoom(zoom + 0.1)}
          >
            +
          </Button>
          <span className="text-sm text-white">Zoom: {zoom.toFixed(1)}</span>
          <Button
            variant="default"
            size="icon"
            onClick={() => setZoom(zoom - 0.1)}
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorCanvas;
