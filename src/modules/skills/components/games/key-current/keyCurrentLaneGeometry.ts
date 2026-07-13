/**
 * Deterministic lane/perspective geometry for the Key Current playfield.
 *
 * Single source of truth (checkpoint 1C.1): the causeway trapezoid, the gate
 * travel band, and the runner line are all derived from these constants so
 * the road edges, the gate footprint and the character share one vanishing
 * point on the horizon. `keyCurrent.module.css` mirrors the gate formulas —
 * any change here must be reflected in the `.obstacle` rules (documented
 * inline there).
 *
 * All Y values are fractions of playfield HEIGHT; widths are computed in px
 * from the measured playfield size.
 */

export const LANE_GEOMETRY = {
  /** Sea line of the far-background plates — the vanishing point sits here. */
  horizonY: 0.39,
  /** Vanishing point X (fraction of playfield width). */
  vanishingX: 0.5,
  /** The lane's visible far end starts just below the horizon. */
  laneTopY: 0.405,
  /** Gate bottom edge when a gate spawns (far). */
  gateFarY: 0.428,
  /** Gate bottom edge at the collision point (near). */
  gateNearY: 0.79,
  /** Runner feet line. */
  runnerFeetY: 0.975,
  /** The gate art (stone pillars) overhangs the road edges slightly. */
  pillarOverhang: 1.15,
  /** Gate width at the NEAR line — matches the CSS clamp on `.obstacle`. */
  gateNear: { minPx: 215, viewportFraction: 0.6, maxPx: 340 },
} as const;

/** Gate art width (px) when the gate reaches the player. */
export function gateNearWidthPx(playfieldWidth: number): number {
  const { minPx, viewportFraction, maxPx } = LANE_GEOMETRY.gateNear;
  return Math.min(maxPx, Math.max(minPx, playfieldWidth * viewportFraction));
}

/** Gate bottom-edge Y (fraction of height) for a given approach progress 0..1. */
export function gateYAtProgress(progress: number): number {
  const { gateFarY, gateNearY } = LANE_GEOMETRY;
  return gateFarY + (gateNearY - gateFarY) * progress;
}

/**
 * Perspective scale for a gate at `progress`. Derived, not tuned: scale is
 * proportional to distance below the horizon, hitting exactly 1 at the near
 * line, so gate width tracks road width at every depth.
 *
 *   scale(p) = (y(p) - horizonY) / (gateNearY - horizonY)
 *            = 0.0842 + 0.9158 * p   (with the current constants)
 */
export function gateScaleAtProgress(progress: number): number {
  const { horizonY, gateNearY } = LANE_GEOMETRY;
  return (gateYAtProgress(progress) - horizonY) / (gateNearY - horizonY);
}

/** Road width (px) at a given Y — 0 at the horizon, linear below it. */
export function laneWidthAtY(
  y: number,
  playfieldWidth: number,
): number {
  const { horizonY, gateNearY, pillarOverhang } = LANE_GEOMETRY;
  const roadNearWidth = gateNearWidthPx(playfieldWidth) / pillarOverhang;
  return Math.max(0, (roadNearWidth * (y - horizonY)) / (gateNearY - horizonY));
}

/** X coordinates (px) of the road's left/right edges at a given Y. */
export function laneEdgesAtY(
  y: number,
  playfieldWidth: number,
): { left: number; right: number } {
  const center = playfieldWidth * LANE_GEOMETRY.vanishingX;
  const half = laneWidthAtY(y, playfieldWidth) / 2;
  return { left: center - half, right: center + half };
}

export type LanePolygon = {
  /** clip-path polygon string in px coordinates. */
  clipPath: string;
  /** Corner points for SVG edge strokes: [topLeft, bottomLeft, bottomRight, topRight]. */
  points: Array<{ x: number; y: number }>;
};

/** Converging causeway trapezoid for the measured playfield size. */
export function computeLanePolygon(
  playfieldWidth: number,
  playfieldHeight: number,
): LanePolygon {
  const { laneTopY } = LANE_GEOMETRY;
  const yTop = laneTopY * playfieldHeight;
  const yBottom = playfieldHeight;
  const top = laneEdgesAtY(laneTopY, playfieldWidth);
  const bottom = laneEdgesAtY(1, playfieldWidth);

  const points = [
    { x: top.left, y: yTop },
    { x: bottom.left, y: yBottom },
    { x: bottom.right, y: yBottom },
    { x: top.right, y: yTop },
  ];

  const clipPath = `polygon(${points
    .map((point) => `${point.x.toFixed(1)}px ${point.y.toFixed(1)}px`)
    .join(', ')})`;

  return { clipPath, points };
}
