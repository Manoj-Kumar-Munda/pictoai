import { ERROR_MESSAGES, MAX_FILE_SIZE } from "@/app/constants";
import useEditingStore from "@/store/editing-store";
import { UploadError } from "@/types";
import { useCallback, useState } from "react";

const useImageUpload = () => {
  const { setImage } = useEditingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UploadError | null>(null);

  const handleImageUpload = useCallback(
    async (file: File): Promise<void> => {
      setIsLoading(true);
      setError(null);

      if (file.size > MAX_FILE_SIZE) {
        setError({ message: ERROR_MESSAGES.FILE_TOO_LARGE });
        setIsLoading(false);
        return;
      }

      let objectUrl: string | null = null;

      try {
        objectUrl = URL.createObjectURL(file);
        const imageElement = new Image();

        await new Promise<void>((resolve, reject) => {
          imageElement.onload = () => resolve();
          imageElement.onerror = () =>
            reject(new Error("Failed to load image"));
          imageElement.src = objectUrl!;
        });

        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });

        setImage(dataUrl, imageElement.width, imageElement.height);
      } catch (err) {
        console.error("Image upload error:", err);
        setError({ message: ERROR_MESSAGES.LOAD_ERROR });
      } finally {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
        setIsLoading(false);
      }
    },
    [setImage]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  return { onDrop, isLoading, error, clearError: () => setError(null) };
};

export default useImageUpload;
