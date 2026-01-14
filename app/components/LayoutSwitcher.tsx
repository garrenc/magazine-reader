"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutSwitcher({ currentLayout }: { currentLayout?: "minimal" | "newspaper" }) {
  const router = useRouter();
  const pathname = usePathname();
  const [layout, setLayout] = useState<"minimal" | "newspaper">(currentLayout || "minimal");

  useEffect(() => {
    if (currentLayout) {
      setLayout(currentLayout);
    }
  }, [currentLayout]);

  const switchLayout = (newLayout: "minimal" | "newspaper") => {
    setLayout(newLayout);
    const params = new URLSearchParams(window.location.search);
    params.set("layout", newLayout);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border p-2 shadow-lg">
      <button
        onClick={() => switchLayout("minimal")}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
          layout === "minimal"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-muted/20"
        }`}
        aria-label="Минималистичный макет"
      >
        Минималистичный
      </button>
      <button
        onClick={() => switchLayout("newspaper")}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
          layout === "newspaper"
            ? "bg-foreground text-background"
            : "text-foreground hover:bg-muted/20"
        }`}
        aria-label="Газетный макет"
      >
        Газетный
      </button>
    </div>
  );
}

