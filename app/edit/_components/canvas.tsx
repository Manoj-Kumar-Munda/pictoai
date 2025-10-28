import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, StageProps, Group, Line } from "react-konva";
import useImage from "use-image";
import DownloadButton from "./download-button";
import useEditingStore from "@/store/editing-store";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import MagicEraserPopup from "@/tools/magic-eraser";
import Konva from "konva";
import useInPaintStore from "@/store/inpaint-store";

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

  const { appliedTool: currentTool, setImage } = useEditingStore();
  const { lines, setLines, clearLines, brushSize } = useInPaintStore();
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (currentTool?.tool_id !== "eraser") return;
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    // Convert screen coordinates to image local coordinates
    const imageGroup = stage.findOne("#imageGroup");
    if (!imageGroup) return;
    const transform = imageGroup.getAbsoluteTransform().copy().invert();
    const localPoint = transform.point(point);

    setLines([...lines, { points: [localPoint.x, localPoint.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || currentTool?.tool_id !== "eraser") return;
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    // Convert screen coordinates to image local coordinates
    const imageGroup = stage.findOne("#imageGroup");
    if (!imageGroup) return;
    const transform = imageGroup.getAbsoluteTransform().copy().invert();
    const localPoint = transform.point(point);

    if (lines.length === 0) return;
    const newLines = [...lines];
    const lastIndex = newLines.length - 1;
    newLines[lastIndex] = {
      ...newLines[lastIndex],
      points: [...newLines[lastIndex].points, localPoint.x, localPoint.y],
    };
    setLines(newLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;

    // Create a temporary stage to merge the image with the painted lines
    const tempStage = new Konva.Stage({
      container: document.createElement("div"),
      width: width,
      height: height,
    });

    const tempLayer = new Konva.Layer();
    tempStage.add(tempLayer);

    const tempImage = new window.Image();
    tempImage.crossOrigin = "anonymous";
    tempImage.onload = () => {
      const konvaImage = new Konva.Image({
        image: tempImage,
        width: width,
        height: height,
      });
      tempLayer.add(konvaImage);

      // Add all the painted lines
      lines.forEach((line) => {
        const konvaLine = new Konva.Line({
          points: line.points,
          stroke: "#df4b26",
          strokeWidth: brushSize,
          tension: 0.5,
          lineCap: "round",
          lineJoin: "round",
          globalCompositeOperation: "source-over",
          opacity: 0.5,
        });
        tempLayer.add(konvaLine);
      });

      tempLayer.batchDraw();
      const uri = tempStage.toDataURL({
        mimeType: "image/png",
        quality: 1,
      });

      setImage(uri, width, height);
      clearLines();

      // Cleanup
      tempStage.destroy();
    };
    tempImage.src = imgUrl;
  };

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
        <Stage
          width={stageWidth}
          height={stageHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          // onTouchStart={handleMouseDown}
          // onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Group
              id="imageGroup"
              scaleX={zoom}
              scaleY={zoom}
              x={(stageWidth - width * zoom) / 2}
              y={(stageHeight - height * zoom) / 2}
            >
              <URLImage
                src={imgUrl}
                width={width}
                height={height}
                draggable={!isDrawing.current}
              />
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={"#df4b26"}
                  strokeWidth={brushSize}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={"source-over"}
                  opacity={0.5}
                />
              ))}
            </Group>
          </Layer>
        </Stage>

        {/* about the current tool and brush size slider */}
        {currentTool?.tool_id === "eraser" && <MagicEraserPopup />}

        {/* download button */}
        <div className="absolute  right-4 top-4 z-50 border">
          <DownloadButton url={imgUrl} />
        </div>

        {/* zoom buttons + and - */}
        <div className="absolute bottom-4 right-4 bg-foreground rounded-2xl flex gap-2 z-10 items-center">
          <Button
            variant="default"
            size="icon"
            className="cursor-pointer"
            onClick={handleZoomIn}
          >
            +
          </Button>
          <span className="text-sm text-white">Zoom: {zoom.toFixed(1)}</span>
          <Button
            variant="default"
            size="icon"
            onClick={handleZoomOut}
            className="cursor-pointer"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorCanvas;
