import { DEMO_IMAGES } from "@/constants";
import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { UploadError } from "@/types";
import { Image } from "@imagekit/next";
import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

const ImageUploadZone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading,
  error,
}: {
  getRootProps: () => DropzoneRootProps;
  getInputProps: () => DropzoneInputProps;
  isDragActive: boolean;
  isLoading: boolean;
  error: UploadError | null;
}) => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-lg">
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-full bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive && "border-blue-500 bg-blue-50",
          !isDragActive &&
            "border-gray-400 hover:border-gray-500 hover:bg-gray-50",
          isLoading && "pointer-events-none opacity-60"
        )}
        role="button"
        aria-label="Upload image"
        tabIndex={0}
      >
        <input {...getInputProps()} aria-label="Image file input" />

        <div className="text-center max-w-md px-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Loading image...</p>
            </div>
          ) : (
            <>
              <p className="mb-2 text-xs font-bold text-neutral-500">
                Drop or click to upload an image (max. 10MB)
              </p>
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium text-sm "
              >
                Choose Image
              </button>

              <div className="mt-4 space-y-2 mx-auto">
                <p className="text-gray-400 text-xs font-semibold">
                  Choose a picture to start with
                </p>
                {/* on clicking it, it will be stored in the editing store */}

                {DEMO_IMAGES.map((img) => (
                  <DemoImage key={img.src} img={img} />
                ))}
              </div>
            </>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DemoImage = ({ img }: { img: (typeof DEMO_IMAGES)[number] }) => {
  const { setImage } = useEditingStore();

  const setDemoImage = async (
    e: React.MouseEvent<HTMLDivElement>,
    url: string
  ) => {
    e.stopPropagation();

    const imageUrl = `${process.env
      .NEXT_PUBLIC_IMAGEKIT_URL!}/tr:orig-true${url}`;

    // Preload to get natural width/height so canvas scales correctly
    try {
      const imgEl = new window.Image();
      imgEl.crossOrigin = "anonymous";
      const dims = await new Promise<{ w: number; h: number }>(
        (resolve, reject) => {
          imgEl.onload = () =>
            resolve({ w: imgEl.naturalWidth, h: imgEl.naturalHeight });
          imgEl.onerror = () => reject(new Error("Failed to load demo image"));
          imgEl.src = imageUrl;
        }
      );

      setImage(imageUrl, dims.w, dims.h);
    } catch {
      setImage(imageUrl);
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center justify-center gap-2"
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        setDemoImage(e, img.src)
      }
    >
      <Image
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
        src={img.src}
        alt={img.alt}
        width={72}
        height={72}
      />
    </div>
  );
};

export default ImageUploadZone;
