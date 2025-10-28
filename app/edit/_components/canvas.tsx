import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Image, StageProps, Group, Line } from "react-konva";
import useImage from "use-image";
import DownloadButton from "./download-button";
import useEditingStore from "@/store/editing-store";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import MagicEraserPopup from "@/tools/magic-eraser";
import Konva from "konva";
import useInPaintStore from "@/store/inpaint-store";

const URLImage = ({ src, ...rest }: { src: string } & StageProps) => {
  const [image] = useImage(src, "anonymous");
  if (image) return <Image image={image} {...rest} />;
  return null;
};

const ImageEditorCanvas = () => {
  const [zoom, setZoom] = useState<number>(0.2);
  const [stageWidth, setStageWidth] = useState<number>(800);
  const [stageHeight, setStageHeight] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const { appliedTool: currentTool, image, setImage } = useEditingStore();
  const { lines, setLines, clearLines, brushSize } = useInPaintStore();
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  // Helper: Get local coordinates from screen coordinates
  const getLocalPoint = useCallback(
    (stage: Konva.Stage, screenPoint: { x: number; y: number }) => {
      const imageGroup = stage.findOne("#imageGroup");
      if (!imageGroup) return null;
      const transform = imageGroup.getAbsoluteTransform().copy().invert();
      return transform.point(screenPoint);
    },
    []
  );

  // Helper: Merge image with painted lines
  const mergeImageWithLines = useCallback(() => {
    if (lines.length === 0) return;

    const tempStage = new Konva.Stage({
      container: document.createElement("div"),
      width: image.width,
      height: image.height,
    });

    const tempLayer = new Konva.Layer();
    tempStage.add(tempLayer);

    const tempImage = new window.Image();
    tempImage.crossOrigin = "anonymous";

    tempImage.onload = () => {
      const konvaImage = new Konva.Image({
        image: tempImage,
        width: image.width,
        height: image.height,
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

      setImage(uri, image.width, image.height);
      clearLines();
      tempStage.destroy();
    };

    tempImage.onerror = () => {
      console.error("Failed to load image for merging");
      tempStage.destroy();
    };

    tempImage.src = image.url;
  }, [
    lines,
    brushSize,
    image.width,
    image.height,
    image.url,
    setImage,
    clearLines,
  ]);
  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const handleMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (currentTool?.tool_id !== "eraser") return;
      isDrawing.current = true;
      const stage = e.target.getStage();
      if (!stage) return;
      const point = stage.getPointerPosition();
      if (!point) return;

      const localPoint = getLocalPoint(stage, point);
      if (!localPoint) return;

      setLines([...lines, { points: [localPoint.x, localPoint.y] }]);
    },
    [currentTool, lines, setLines, getLocalPoint]
  );

  const handleMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current || currentTool?.tool_id !== "eraser") return;
      const stage = e.target.getStage();
      if (!stage) return;
      const point = stage.getPointerPosition();
      if (!point) return;

      const localPoint = getLocalPoint(stage, point);
      if (!localPoint || lines.length === 0) return;

      const newLines = [...lines];
      const lastIndex = newLines.length - 1;
      newLines[lastIndex] = {
        ...newLines[lastIndex],
        points: [...newLines[lastIndex].points, localPoint.x, localPoint.y],
      };
      setLines(newLines);
    },
    [currentTool, lines, setLines, getLocalPoint]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    mergeImageWithLines();
  }, [mergeImageWithLines]);

  useEffect(() => {
    if (containerRef.current) {
      setStageWidth(containerRef.current.offsetWidth);
      setStageHeight(containerRef.current.offsetHeight);
    }
  }, []);

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
              x={(stageWidth - image.width * zoom) / 2}
              y={(stageHeight - image.height * zoom) / 2}
            >
              <URLImage
                src={image.url}
                width={image.width}
                height={image.height}
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

        {/* download button */}
        <div className="absolute  right-4 top-4 z-50 border">
          <DownloadButton url={image.url} />
        </div>

        {/* zoom buttons + and - */}
        <div className="absolute bottom-4 right-4 bg-accent rounded-2xl flex gap-2 z-10 items-center">
          <Button
            variant="default"
            size="icon"
            className="cursor-pointer bg-accent text-neutral-500 font-bold"
            onClick={handleZoomIn}
          >
            +
          </Button>
          <span className="text-xs font-bold text-neutral-500 ">
            {zoom.toFixed(1)}
          </span>
          <Button
            variant="default"
            size="icon"
            onClick={handleZoomOut}
            className="cursor-pointer bg-accent text-neutral-500 font-bold"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorCanvas;
