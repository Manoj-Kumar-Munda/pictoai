import { DEMO_IMAGES } from "@/constants";
import { cn } from "@/lib/utils";
import useEditingStore from "@/store/editing-store";
import { UploadError } from "@/types";
import { Image } from "@imagekit/next";
import { ImagePlus, Upload } from "lucide-react";
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
    <div className="w-full h-full bg-editor-surface p-5">
      <div
        {...getRootProps()}
        className={cn(
          "w-full h-full flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300",
          "border-2 border-dashed",
          isDragActive && [
            "border-editor-accent bg-editor-accent-subtle/50",
            "shadow-inner shadow-editor-accent/10",
          ],
          !isDragActive && [
            "border-editor-border",
            "bg-editor-surface-secondary/50",
            "hover:border-editor-border-hover",
            "hover:bg-editor-surface-secondary",
          ],
          isLoading && "pointer-events-none opacity-60",
        )}
        role="button"
        aria-label="Upload image"
        tabIndex={0}
      >
        <input {...getInputProps()} aria-label="Image file input" />

        <div className="text-center max-w-md px-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative size-12">
                <div className="absolute inset-0 rounded-full border-[3px] border-editor-border" />
                <div className="absolute inset-0 rounded-full border-[3px] border-editor-accent border-t-transparent animate-spin" />
              </div>
              <p className="text-sm text-editor-text-secondary font-medium">
                Loading image...
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="size-14 rounded-2xl bg-editor-surface-tertiary flex items-center justify-center border border-editor-border/50">
                  <ImagePlus
                    className="size-6 text-editor-text-muted"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-editor-text-secondary">
                    Drop or click to upload
                  </p>
                  <p className="text-xs text-editor-text-muted mt-0.5">
                    PNG, JPG, or WebP · Max 10 MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                  "bg-gradient-to-r from-editor-action to-editor-action-deep hover:from-editor-action-hover hover:to-editor-action",
                  "text-white shadow-md shadow-editor-action/20 hover:shadow-lg hover:shadow-editor-action/30",
                  "transition-all duration-300 hover:-translate-y-[1px]",
                )}
              >
                <Upload className="size-4" strokeWidth={2} />
                Choose Image
              </button>

              {DEMO_IMAGES.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex-1 h-px bg-gradient-to-r from-transparent via-editor-border to-transparent" />
                    <p className="text-[11px] text-editor-text-muted font-medium uppercase tracking-wider">
                      Or try a sample
                    </p>
                    <span className="flex-1 h-px bg-gradient-to-r from-transparent via-editor-border to-transparent" />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {DEMO_IMAGES.map((img) => (
                      <DemoImage key={img.src} img={img} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error.message}
              </p>
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
    url: string,
  ) => {
    e.stopPropagation();

    const imageUrl = `${process.env
      .NEXT_PUBLIC_IMAGEKIT_URL!}/tr:orig-true${url}`;

    try {
      const imgEl = new window.Image();
      imgEl.crossOrigin = "anonymous";
      const dims = await new Promise<{ w: number; h: number }>(
        (resolve, reject) => {
          imgEl.onload = () =>
            resolve({ w: imgEl.naturalWidth, h: imgEl.naturalHeight });
          imgEl.onerror = () => reject(new Error("Failed to load demo image"));
          imgEl.src = imageUrl;
        },
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
      className="group relative overflow-hidden rounded-xl border border-editor-border/60 transition-all duration-300 hover:shadow-md hover:shadow-black/8 hover:-translate-y-0.5 hover:border-editor-border-hover"
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
        className="size-16 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ImageUploadZone;
