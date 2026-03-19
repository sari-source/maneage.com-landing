/**
 * FlickeringLogoM
 * ---------------
 * Renders the maneage M logo as a large flickering green pixel grid
 * positioned as a glowing background element in the hero section.
 * The logo shape is used as a CSS mask over the flickering grid canvas.
 *
 * Design: Dark Organic Luxury — black primary, dark green secondary.
 * The M crown fills most of the hero background, creating a dramatic
 * shimmering backdrop behind the headline text.
 */

import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const LOGO_CDN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663449784867/5yQU86oXtXa6fLvktEVHyi/maneage-m-mask_f3b91a38.png";

export function FlickeringLogoM({ size }: { size?: number } = {}) {
  // size is ignored — we use 100vw to fill the full hero
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        height: "56.25vw", // maintain aspect ratio of the M crown (wider than tall)
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.30,
        filter: "drop-shadow(0 0 80px rgba(34,197,94,0.45)) drop-shadow(0 0 160px rgba(34,197,94,0.2))",
      }}
    >
      <div
        style={{
          WebkitMaskImage: `url('${LOGO_CDN}')`,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url('${LOGO_CDN}')`,
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <FlickeringGrid
          color="#22C55E"
          maxOpacity={1}
          flickerChance={0.25}
          squareSize={4}
          gridGap={5}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
