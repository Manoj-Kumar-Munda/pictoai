import Konva from "konva";
import useEditingStore from "@/store/editing-store";
import useInPaintStore from "@/store/inpaint-store";

const LINE_CONFIG = {
  stroke: "#df4b26",
  tension: 0.5,
  lineCap: "round" as const,
  lineJoin: "round" as const,
  globalCompositeOperation: "source-over" as const,
  opacity: 0.5,
} as const;

/**
 * Merge the current eraser paint lines into the image and update the store.
 * Returns a promise that resolves once the merge is complete (image loaded
 * and store updated) so callers can await before sending the image to the AI.
 */
export function mergeEraserMask(): Promise<void> {
  const { lines, brushSize, clearLines } = useInPaintStore.getState();
  const { image, setImage } = useEditingStore.getState();

  if (lines.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const tempStage = new Konva.Stage({
      container: document.createElement("div"),
      width: image.width,
      height: image.height,
    });

    const tempLayer = new Konva.Layer();
    tempStage.add(tempLayer);

    const tempImg = new window.Image();
    tempImg.crossOrigin = "anonymous";

    tempImg.onload = () => {
      tempLayer.add(
        new Konva.Image({
          image: tempImg,
          width: image.width,
          height: image.height,
        }),
      );

      for (const line of lines) {
        tempLayer.add(
          new Konva.Line({
            points: line.points,
            ...LINE_CONFIG,
            strokeWidth: brushSize,
          }),
        );
      }

      tempLayer.batchDraw();

      const uri = tempStage.toDataURL({ mimeType: "image/png", quality: 1 });
      setImage(uri, image.width, image.height);
      clearLines();
      tempStage.destroy();
      resolve();
    };

    tempImg.onerror = () => {
      console.error("Failed to load image for merging");
      tempStage.destroy();
      reject(new Error("Failed to load image for merging"));
    };

    tempImg.src = image.url;
  });
}
