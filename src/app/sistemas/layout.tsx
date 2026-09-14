import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Sistemas" };

export default function SistemasLayout({ children }: { children: ReactNode }) {
  return children;
}
