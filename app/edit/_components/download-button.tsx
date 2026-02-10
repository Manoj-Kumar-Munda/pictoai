import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const DownloadButton = ({
  className,
  url,
}: {
  className?: string;
  url: string;
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.png";
    link.click();
  };
  return (
    <Button
      onClick={handleDownload}
      className={cn(
        "gap-2 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer",
        "bg-gradient-to-r from-editor-action to-editor-action-deep hover:from-editor-action-hover hover:to-editor-action",
        "text-white shadow-md shadow-editor-action/20 hover:shadow-lg hover:shadow-editor-action/30",
        "transition-all duration-300 hover:-translate-y-[1px]",
        className,
      )}
    >
      <Download className="size-3.5" strokeWidth={2.5} />
      <span>Download</span>
    </Button>
  );
};

export default DownloadButton;
