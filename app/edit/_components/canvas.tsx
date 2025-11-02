import { useEffect, useRef, useState, useCallback } from "react";
import { Stage, Layer, Image, StageProps, Group, Line } from "react-konva";
import useImage from "use-image";
import DownloadButton from "./download-button";
import useEditingStore from "@/store/editing-store";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useInPaintStore from "@/store/inpaint-store";
import ZoomButton from "./zoom-button";
import MagicEraserPopup from "@/tools/magic-eraser";

const URLImage = ({ src, ...rest }: { src: string } & StageProps) => {
  const [image] = useImage(src, "anonymous");
  if (image) return <Image image={image} {...rest} />;
  return null;
};

const ImageEditorCanvas = () => {
  const [stageWidth, setStageWidth] = useState<number>(800);
  const [stageHeight, setStageHeight] = useState<number>(600);

  const containerRef = useRef<HTMLDivElement>(null);
  const previousImageUrl = useRef<string>("");

  const {
    appliedTool: currentTool,
    image,
    setImage,
    zoom,
    setZoom,
  } = useEditingStore();
  const { lines, setLines, clearLines, brushSize } = useInPaintStore();
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const getLocalPoint = useCallback(
    (stage: Konva.Stage, screenPoint: { x: number; y: number }) => {
      const imageGroup = stage.findOne("#imageGroup");
      if (!imageGroup) return null;
      const transform = imageGroup.getAbsoluteTransform().copy().invert();
      return transform.point(screenPoint);
    },
    []
  );

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
    if (containerRef.current && image.url && image.width && image.height) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Set stage dimensions to match image
      setStageWidth(image.width);
      setStageHeight(image.height);

      // Only calculate initial zoom if this is a new image
      if (previousImageUrl.current !== image.url) {
        // Calculate zoom to fit image within container with some padding
        const padding = 80; // padding in pixels
        const scaleX = (containerWidth - padding) / image.width;
        const scaleY = (containerHeight - padding) / image.height;
        const initialZoom = Math.min(scaleX, scaleY, 1); // Don't zoom in beyond 100% initially

        setZoom(initialZoom);
        previousImageUrl.current = image.url;
      }
    }
  }, [image, setZoom]);

  // Calculate the actual display dimensions based on zoom
  const displayWidth = stageWidth * zoom;
  const displayHeight = stageHeight * zoom;

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full border-b bg-background px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-medium">Image Editor</div>
        <DownloadButton url={image.url} />
      </div>

      <div
        ref={containerRef}
        className="flex-1 min-h-0"
        style={{
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: `${displayWidth}px`,
            minHeight: `${displayHeight}px`,
          }}
        >
          <Stage
            width={displayWidth}
            height={displayHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Group id="imageGroup" scaleX={zoom} scaleY={zoom}>
                <URLImage
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  draggable={false}
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
        </div>

        {currentTool?.tool_id === "eraser" && <MagicEraserPopup />}
      </div>

      <div className="w-full py-3 border-t bg-background flex items-center justify-end pr-4 ">
        <ZoomButton />
      </div>
    </div>
  );
};

export default ImageEditorCanvas;
