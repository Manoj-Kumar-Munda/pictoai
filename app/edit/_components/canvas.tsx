import { useEffect, useRef, useState, useCallback } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  StageProps,
  Group,
  Line,
} from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import DownloadButton from "./download-button";
import ZoomButton from "./zoom-button";
import MagicEraserPopup from "@/tools/magic-eraser";
import ShaderOverlay from "./shader-overlay";

const URLImage = ({ src, ...rest }: { src: string } & StageProps) => {
  const [image] = useImage(src, "anonymous");
  if (image) return <KonvaImage image={image} {...rest} />;
  return null;
};

const PADDING = 80; // Padding for initial zoom calculation
const LINE_CONFIG = {
  stroke: "#df4b26",
  tension: 0.5,
  lineCap: "round" as const,
  lineJoin: "round" as const,
  globalCompositeOperation: "source-over" as const,
  opacity: 0.5,
};

const ImageEditorCanvas = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 800,
    height: 600,
  });
  const [hasInitializedZoom, setHasInitializedZoom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const {
    appliedTool: currentTool,
    image,
    setImage,
    zoom,
    setZoom,
    isProcessing,
  } = useEditingStore();
  const { lines, setLines, clearLines, brushSize } = useInPaintStore();

  // Helper to get local coordinates from screen coordinates
  const getLocalPoint = useCallback(
    (stage: Konva.Stage, screenPoint: { x: number; y: number }) => {
      const imageGroup = stage.findOne("#imageGroup");
      if (!imageGroup) return null;
      const transform = imageGroup.getAbsoluteTransform().copy().invert();
      return transform.point(screenPoint);
    },
    []
  );

  // Merge painted lines with the image
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
          ...LINE_CONFIG,
          strokeWidth: brushSize,
        });
        tempLayer.add(konvaLine);
      });

      tempLayer.batchDraw();

      const uri = tempStage.toDataURL({ mimeType: "image/png", quality: 1 });
      setImage(uri, image.width, image.height);
      clearLines();
      tempStage.destroy();
    };

    tempImage.onerror = () => {
      console.error("Failed to load image for merging");
      tempStage.destroy();
    };

    tempImage.src = image.url;
  }, [lines, brushSize, image, setImage, clearLines]);

  // Mouse event handlers for drawing
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

  // Initialize stage dimensions and zoom when image loads or changes
  useEffect(() => {
    if (!containerRef.current || !image.url || !image.width || !image.height) {
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    // Calculate and set initial zoom only once per image
    if (!hasInitializedZoom) {
      const scaleX = (containerWidth - PADDING) / image.width;
      const scaleY = (containerHeight - PADDING) / image.height;
      const initialZoom = Math.min(scaleX, scaleY, 1);

      setZoom(initialZoom);
      setHasInitializedZoom(true);
    }
  }, [image.url, image.width, image.height, setZoom, hasInitializedZoom]);

  // Reset zoom initialization flag when image changes
  useEffect(() => {
    setHasInitializedZoom(false);
    // Update stage dimensions
    if (image) {
      setStageDimensions({ width: image.width, height: image.height });
    }
  }, [image]);

  // Calculate display dimensions
  const displayWidth = stageDimensions.width * zoom;
  const displayHeight = stageDimensions.height * zoom;

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="w-full border-b bg-background px-4 py-3 flex items-center justify-end flex-shrink-0">
        <DownloadButton url={image.url} />
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="flex-1 min-h-0 overflow-auto relative">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            minWidth: `${displayWidth}px`,
            minHeight: `${displayHeight}px`,
          }}
        >
          <div
            className="relative"
            style={{ width: displayWidth, height: displayHeight }}
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
                      {...LINE_CONFIG}
                      strokeWidth={brushSize}
                    />
                  ))}
                </Group>
              </Layer>
            </Stage>

            {/* Shader overlay when processing */}
            <ShaderOverlay
              width={displayWidth}
              height={displayHeight}
              active={!!isProcessing}
            />
          </div>
        </div>
      </div>

      <div className="w-full py-3 border-t bg-background flex items-center justify-end pr-4 flex-shrink-0">
        <ZoomButton />
      </div>

      
      {currentTool?.tool_id === "eraser" && <MagicEraserPopup />}
    </div>
  );
};

export default ImageEditorCanvas;
