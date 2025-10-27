import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h2 className={cn("font-bold text-secondary", className)}>{children}</h2>
  );
};

export default Heading;
