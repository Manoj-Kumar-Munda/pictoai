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
        "gap-1.5 rounded-md  bg-blue-500 text-white cursor-pointer hover:bg-blue-600 shadow-md transition-all duration-300",
        className
      )}
    >
      <span className="text-xs font-bold">Download</span>
      <Download className="size-3.5" strokeWidth={3} />
    </Button>
  );
};

export default DownloadButton;
