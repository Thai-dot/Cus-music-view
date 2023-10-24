"use client";

import React from "react";
import NavbarLayout from "./navbar";
import FooterLayout from "./footer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
 
  return (
    <div>
      <NavbarLayout />
      <div className={cn("min-h-screen", pathName === "/" ? "" : "py-16")}>
        {children}
      </div>
      <FooterLayout />
    </div>
  );
}
