import type { LucideIcon } from "lucide-react";
import { BRAND_CYAN, BRAND_VIOLET } from "@/lib/brand";

type BrandIconProps = {
  icon: LucideIcon;
  className?: string;
  gradient?: boolean;
};

// Renders a lucide icon tinted with the brand identity.
// Default: solid brand-cyan tint (robust everywhere, matches shipped fundador icons).
// gradient=true: strokes the icon with the shared gradient defs rendered once via <BrandIconDefs/>.
export default function BrandIcon({ icon: Icon, className, gradient = false }: BrandIconProps) {
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={1.75}
      className={gradient ? className : `text-brand-cyan ${className ?? ""}`.trim()}
      style={gradient ? { stroke: "url(#brand-icon-gradient)" } : undefined}
    />
  );
}

// Hidden shared gradient definition — render once in app/layout.tsx so any
// BrandIcon with gradient=true can reference `url(#brand-icon-gradient)`.
export function BrandIconDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="brand-icon-gradient" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={BRAND_CYAN} />
          <stop offset="100%" stopColor={BRAND_VIOLET} />
        </linearGradient>
      </defs>
    </svg>
  );
}
