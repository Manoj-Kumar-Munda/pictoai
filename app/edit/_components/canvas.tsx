import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, StageProps } from "react-konva";
import useImage from "use-image";

interface ImageEditorCanvasProps {
  imageUrl: string;
  width: number;
  height: number;
}

const URLImage = ({ src, ...rest }: { src: string } & StageProps) => {
  const [image] = useImage(src, "anonymous");

  if (image) return <Image image={image} {...rest} />;
  return null;
};

const ImageEditorCanvas = ({
  imageUrl,
  width,
  height,
}: ImageEditorCanvasProps) => {
  const [imgUrl, setImgUrl] = useState<string>("");
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

  useEffect(() => {
    setImgUrl(imageUrl);
  }, [imageUrl]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full relative">
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            <URLImage
              src={imgUrl}
              width={width}
              height={height}
              scaleX={zoom}
              scaleY={zoom}
              x={(stageWidth - width * zoom) / 2}
              y={(stageHeight - height * zoom) / 2}
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
