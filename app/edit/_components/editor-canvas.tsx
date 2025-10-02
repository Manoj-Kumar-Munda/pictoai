"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const EditorCanvas = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
  });

  if (uploadedImage) {
    return (
      <div className="w-full h-full">
        <div className="w-full h-full bg-white rounded-lg border border-gray-300 overflow-hidden">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg">
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-400 hover:border-gray-500 hover:bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {isDragActive
              ? "Drop the image here..."
              : "Drop an image here or click to upload"}
          </p>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Choose Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
