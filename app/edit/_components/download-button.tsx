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
        "gap-1.5 rounded-md  bg-blue-600 text-white cursor-pointer hover:bg-blue-700 shadow-md transition-all duration-300 text-xs font-semibold",
        className
      )}
    >
      <span>Download</span>
      <Download className="size-3.5" strokeWidth={3} />
    </Button>
  );
};

export default DownloadButton;
