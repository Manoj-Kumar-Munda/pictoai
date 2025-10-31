import { cn } from "@/lib/utils";
import { UploadError } from "@/types";
import { Image } from "@imagekit/next";

const ImageUploadZone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isLoading,
  error,
}: {
  getRootProps: () => any;
  getInputProps: () => any;
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
             
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium text-sm "
              >
                Choose Image
              </button>

              <p className="text-[10px] font-semibold text-gray-400 mt-1">
                Supports: JPG, PNG, GIF, BMP, WebP (max 10MB)
              </p>

              <div className="mt-4 space-y-2 mx-auto">
                <p className="text-gray-400 text-xs font-semibold">
                  Choose a picture to start with
                </p>
                {/* on clicking it, it will be stored in the editing store */}
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center justify-center gap-2"
                  onClick={(e) => {
                    alert("hello");
                    e.stopPropagation();
                  }}
                >
                  <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
                    src="/PictoAI/Demo/home.jpg"
                    alt="Home"
                    width={72}
                    height={72}
                  />
                </div>
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

export default ImageUploadZone;
