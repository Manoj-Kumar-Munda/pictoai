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
      className={cn("gap-1.5 rounded-md text-black active-effect", className)}
    >
      Download
      <Download className="size-4" />
    </Button>
  );
};

export default DownloadButton;
