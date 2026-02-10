"use client";

import { memo, useEffect, useRef, useState, useCallback } from "react";
import type { KonvaEventObject } from "konva/lib/Node";
import type Konva from "konva";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  StageProps,
  Group,
  Line,
} from "react-konva";
import useImage from "use-image";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";
import DownloadButton from "./download-button";
import ZoomButton from "./zoom-button";
import ShaderOverlay from "./shader-overlay";

// --- Constants ---

const PADDING = 80;
const LINE_CONFIG = {
  stroke: "#df4b26",
  tension: 0.5,
  lineCap: "round" as const,
  lineJoin: "round" as const,
  globalCompositeOperation: "source-over" as const,
  opacity: 0.5,
} as const;

// --- Sub-components ---

/** Renders a remote image onto the Konva canvas. Memoised to avoid re-loading
 *  the image when unrelated parent state changes (e.g. zoom, lines). */
const URLImage = memo(({ src, ...rest }: { src: string } & StageProps) => {
  const [image] = useImage(src, "anonymous");
  if (!image) return null;
  return <KonvaImage image={image} {...rest} />;
});
URLImage.displayName = "URLImage";

/** Top toolbar — only depends on `image.url`. Isolated so zoom / line changes
 *  don't force a re-render of the download button. */
const CanvasToolbar = memo(() => {
  const url = useEditingStore((s) => s.image.url);
  return (
    <div className="w-full border-b border-editor-border/40 bg-editor-surface/80 backdrop-blur-sm px-4 py-3 flex items-center justify-end flex-shrink-0">
      <DownloadButton url={url} />
    </div>
  );
});
CanvasToolbar.displayName = "CanvasToolbar";

/** Bottom toolbar — only depends on zoom primitives. */
const CanvasFooter = memo(() => (
  <div className="w-full py-3 border-t border-editor-border/40 bg-editor-surface/80 backdrop-blur-sm flex items-center justify-end pr-4 flex-shrink-0">
    <ZoomButton />
  </div>
));
CanvasFooter.displayName = "CanvasFooter";

// --- Helpers ---

/** Convert screen-space pointer position to image-local coordinates. */
function getLocalPoint(
  stage: Konva.Stage,
  screenPoint: { x: number; y: number },
) {
  const imageGroup = stage.findOne("#imageGroup");
  if (!imageGroup) return null;
  return imageGroup.getAbsoluteTransform().copy().invert().point(screenPoint);
}

// --- Main Component ---

const ImageEditorCanvas = () => {
  // -- Granular store selectors (rerender-defer-reads) --
  const image = useEditingStore((s) => s.image);
  const zoom = useEditingStore((s) => s.zoom);
  const setZoom = useEditingStore((s) => s.setZoom);
  const isProcessing = useEditingStore((s) => s.isProcessing);
  const currentToolId = useEditingStore((s) => s.appliedTool?.tool_id);

  const lines = useInPaintStore((s) => s.lines);
  const setLines = useInPaintStore((s) => s.setLines);
  const brushSize = useInPaintStore((s) => s.brushSize);

  // -- Local state --
  const [stageDimensions, setStageDimensions] = useState({
    width: 800,
    height: 600,
  });

  // -- Refs --
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const isDrawing = useRef(false);
  const prevImageUrl = useRef<string>("");

  // Keep mutable refs for values used inside pointer callbacks so the
  // callbacks themselves remain stable and don't re-create on every stroke
  // point (rerender-use-ref-transient-values).
  const linesRef = useRef(lines);
  linesRef.current = lines;

  // -- Pointer handlers (stable — they read refs, not state) --
  const handleMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (currentToolId !== "eraser") return;
      isDrawing.current = true;

      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!stage || !point) return;

      const local = getLocalPoint(stage, point);
      if (!local) return;

      setLines([...linesRef.current, { points: [local.x, local.y] }]);
    },
    [currentToolId, setLines],
  );

  const handleMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current || currentToolId !== "eraser") return;

      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (!stage || !point) return;

      const local = getLocalPoint(stage, point);
      const current = linesRef.current;
      if (!local || current.length === 0) return;

      const lastIdx = current.length - 1;
      const updated = [...current];
      updated[lastIdx] = {
        ...updated[lastIdx],
        points: [...updated[lastIdx].points, local.x, local.y],
      };
      setLines(updated);
    },
    [currentToolId, setLines],
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  // -- Effects --

  // Initialise stage dimensions and calculate fit-to-view zoom when image
  // source changes. A ref tracks the previous URL so we only reset zoom on
  // actual image changes, not on every render.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !image.url || !image.width || !image.height) return;

    setStageDimensions({ width: image.width, height: image.height });

    // Only recalculate zoom when the image source actually changes.
    if (image.url === prevImageUrl.current) return;
    prevImageUrl.current = image.url;

    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;
    const scaleX = (containerW - PADDING) / image.width;
    const scaleY = (containerH - PADDING) / image.height;
    setZoom(Math.min(scaleX, scaleY, 1));
  }, [image.url, image.width, image.height, setZoom]);

  // -- Derived values --
  const displayWidth = stageDimensions.width * zoom;
  const displayHeight = stageDimensions.height * zoom;

  return (
    <div
      className="w-full h-full flex flex-col relative"
      role="application"
      aria-label="Image editor canvas"
    >
      <CanvasToolbar />

      {/* Canvas area */}
      <div ref={containerRef} className="flex-1 min-h-0 overflow-auto relative">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ minWidth: displayWidth, minHeight: displayHeight }}
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

            <ShaderOverlay
              width={displayWidth}
              height={displayHeight}
              active={!!isProcessing}
            />
          </div>
        </div>
      </div>

      <CanvasFooter />
    </div>
  );
};

export default ImageEditorCanvas;
