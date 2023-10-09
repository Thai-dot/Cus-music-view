import { cn } from "@/lib/utils";
import React from "react";
import { GridLoader } from "react-spinners";

export default function CustomGridLoader({
  className,
  size,
  color,
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <div className={cn(" flex-center w-full justify-center mt-10", className)}>
      <GridLoader size={size ?? 15} color={color ?? "#36d7b7"} />
    </div>
  );
}
