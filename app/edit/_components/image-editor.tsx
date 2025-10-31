"use client";
import { useEffect } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import ImageEditorCanvas from "./canvas";
import useEditingStore from "@/store/editing-store";
import ImageUploadZone from "./image-dropzone";
import useImageUpload from "@/hooks/useUploadImage";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";

const EditorCanvas = () => {
  const { image } = useEditingStore();
  const { onDrop, isLoading, error, clearError } = useImageUpload();

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    disabled: isLoading,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  if (image?.url) {
    return (
      <div className="w-full h-full">
        <div className="w-full h-full bg-white rounded-lg border border-gray-300 overflow-hidden">
          <ImageEditorCanvas />
        </div>
      </div>
    );
  }

  return (
    <ImageUploadZone
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default EditorCanvas;
