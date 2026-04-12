"use client";

/**
 * All Sanity Studio imports are deferred into useEffect so they never run
 * during the static build (which would crash on browser-only APIs).
 */
import { useEffect, useRef } from "react";

export default function StudioClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only runs in the browser — safe to import Studio packages here
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ NextStudio }, { default: config }, { createRoot }] = await Promise.all([
        import("next-sanity/studio"),
        import("@/sanity.config"),
        import("react-dom/client"),
      ]);

      if (!containerRef.current) return;

      const root = createRoot(containerRef.current);
      root.render(<NextStudio config={config} />);
      cleanup = () => root.unmount();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
    >
      {/* Sanity Studio mounts here after the browser loads */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", fontFamily: "sans-serif", color: "#94a3b8",
        background: "#101010",
      }}>
        Loading studio…
      </div>
    </div>
  );
}
