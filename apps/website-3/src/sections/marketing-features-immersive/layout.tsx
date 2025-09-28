import { Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata = {
  title: "Features Section 0",
  description: "A modern features section with an animated right panel.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn("flex min-h-svh flex-col antialiased", inter.className)}
      >
        {children}
      </body>
    </html>
  );
}
