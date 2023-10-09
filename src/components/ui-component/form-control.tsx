import { cn } from "@/lib/utils";
import React from "react";

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function FormControl({
  children,
  className,
  ...props
}: FormControlProps) {
  return (
    <div className={cn("my-3", className)} {...props}>
      {children}
    </div>
  );
}
