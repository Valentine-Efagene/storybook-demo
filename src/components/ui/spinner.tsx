import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

interface IProps extends React.ComponentProps<"svg"> {
  size?: "sm" | "md" | "lg";
  show?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Spinner({
  className,
  size = "md",
  show = true,
  ...props
}: IProps) {
  if (!show) {
    return null
  }

  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-gray-500", sizeMap[size], className)}
      {...props}
    />
  );
}
