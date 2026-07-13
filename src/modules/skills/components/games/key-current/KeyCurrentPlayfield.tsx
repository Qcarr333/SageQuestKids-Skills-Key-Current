'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  KEY_CURRENT_BACKGROUNDS,
  KEY_CURRENT_CAUSEWAY_TEXTURE,
} from './keyCurrentAssets';
import {
  LANE_GEOMETRY,
  computeLanePolygon,
  laneEdgesAtY,
} from './keyCurrentLaneGeometry';
import styles from './keyCurrent.module.css';

type KeyCurrentPlayfieldProps = {
  paused: boolean;
  reducedMotion: boolean;
  children: ReactNode;
};

const BUBBLES = [
  { left: '9%', size: 10, duration: '9s', delay: '0s' },
  { left: '18%', size: 7, duration: '12s', delay: '3.2s' },
  { left: '83%', size: 12, duration: '10s', delay: '1.4s' },
  { left: '91%', size: 8, duration: '13s', delay: '5.6s' },
];

const BIRDS = [
  { top: '9%', duration: '38s', delay: '0s', scale: 1 },
  { top: '15%', duration: '52s', delay: '-24s', scale: 0.7 },
];

/**
 * Decorations hug the causeway edges: each item sits at a lane Y, offset a
 * few px outward from the computed road edge, and shrinks with depth so it
 * obeys the same perspective as the road (checkpoint 1C.1).
 */
const PATH_DECOR: Array<{
  kind: 'grass' | 'starfish';
  y: number;
  side: 'left' | 'right';
  offset: number;
  rotate?: number;
}> = [
  { kind: 'grass', y: 0.95, side: 'left', offset: 10 },
  { kind: 'grass', y: 0.9, side: 'right', offset: 14 },
  { kind: 'grass', y: 0.72, side: 'left', offset: 8 },
  { kind: 'grass', y: 0.64, side: 'right', offset: 10 },
  { kind: 'grass', y: 0.5, side: 'left', offset: 6 },
  { kind: 'starfish', y: 0.84, side: 'right', offset: 26, rotate: -24 },
  { kind: 'starfish', y: 0.66, side: 'left', offset: 22, rotate: 18 },
  { kind: 'starfish', y: 0.46, side: 'right', offset: 14, rotate: 40 },
];

const FALLBACK_SIZE = { width: 800, height: 450 };

/**
 * Skills Sea scene (1C.1 geometry pass).
 *
 * The causeway is now a deterministic converging trapezoid computed from
 * `keyCurrentLaneGeometry.ts`: its edges run to the vanishing point on the
 * plate's sea line, the scrolling Higgsfield cobble texture is clipped to
 * that exact shape, and SVG strokes draw the stone edges along the same
 * lines. Gates (positioned by the same constants in CSS) therefore match
 * the road width at every depth.
 */
export function KeyCurrentPlayfield({
  paused,
  reducedMotion,
  children,
}: KeyCurrentPlayfieldProps) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(FALLBACK_SIZE);

  useEffect(() => {
    const node = fieldRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect && rect.width > 0 && rect.height > 0) {
        setSize({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const lane = useMemo(
    () => computeLanePolygon(size.width, size.height),
    [size.width, size.height],
  );

  const decor = useMemo(
    () =>
      PATH_DECOR.map((item) => {
        const edges = laneEdgesAtY(item.y, size.width);
        const x =
          item.side === 'left' ? edges.left - item.offset : edges.right + item.offset;
        // Same linear perspective as the road/gates.
        const depthScale =
          (item.y - LANE_GEOMETRY.horizonY) / (1 - LANE_GEOMETRY.horizonY);
        return { ...item, x, scale: 0.45 + 0.95 * depthScale };
      }),
    [size.width],
  );

  const [topLeft, bottomLeft, bottomRight, topRight] = lane.points;

  return (
    <div
      ref={fieldRef}
      className={`${styles.playfield} ${paused ? styles.paused : ''} ${
        reducedMotion ? styles.reducedMotion : ''
      }`}
    >
      {/* far background plates: portrait art on narrow screens, wide art from sm: up */}
      <div
        className={`${styles.bgPlate} sm:hidden`}
        style={{ backgroundImage: `url(${KEY_CURRENT_BACKGROUNDS.mobile.src})` }}
        aria-hidden
      />
      <div
        className={`${styles.bgPlate} hidden sm:block`}
        style={{ backgroundImage: `url(${KEY_CURRENT_BACKGROUNDS.desktop.src})` }}
        aria-hidden
      />

      <div className={styles.waterSparkles} aria-hidden />
      <div className={`${styles.waterSparkles} ${styles.waterSparkles2}`} aria-hidden />
      <div className={styles.bgDepth} aria-hidden />

      {!reducedMotion &&
        BIRDS.map((bird) => (
          <svg
            key={bird.top}
            viewBox="0 0 26 10"
            className={styles.bird}
            style={{
              top: bird.top,
              animationDuration: bird.duration,
              animationDelay: bird.delay,
              scale: String(bird.scale),
            }}
            aria-hidden
          >
            <path
              d="M1 8 Q7 1 13 7 Q19 1 25 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ))}

      {/* causeway: scrolling texture clipped to the converging trapezoid */}
      <div
        className={styles.laneClip}
        style={{ clipPath: lane.clipPath }}
        aria-hidden
      >
        <div
          className={styles.laneTexture}
          style={{
            backgroundImage: `url(${KEY_CURRENT_CAUSEWAY_TEXTURE.src})`,
            width: bottomRight.x - bottomLeft.x,
          }}
        />
        <div className={styles.laneShading} />
      </div>

      {/* stone edges + far cap drawn on the exact same geometry */}
      <svg
        className={styles.laneEdgeSvg}
        viewBox={`0 0 ${size.width} ${size.height}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1={topLeft.x}
          y1={topLeft.y}
          x2={bottomLeft.x}
          y2={bottomLeft.y}
          className={styles.laneEdgeStroke}
        />
        <line
          x1={topRight.x}
          y1={topRight.y}
          x2={bottomRight.x}
          y2={bottomRight.y}
          className={styles.laneEdgeStroke}
        />
        <line
          x1={topLeft.x + 3}
          y1={topLeft.y}
          x2={bottomLeft.x + 7}
          y2={bottomLeft.y}
          className={styles.laneEdgeLight}
        />
        <line
          x1={topRight.x - 3}
          y1={topRight.y}
          x2={bottomRight.x - 7}
          y2={bottomRight.y}
          className={styles.laneEdgeLight}
        />
        <line
          x1={topLeft.x}
          y1={topLeft.y}
          x2={topRight.x}
          y2={topRight.y}
          className={styles.laneEdgeStroke}
        />
      </svg>

      <div className={styles.laneHaze} aria-hidden />

      {decor.map((item, index) => (
        <div
          key={index}
          className={`${styles.pathDecor} ${
            item.kind === 'grass' ? styles.grassTuft : styles.starfish
          }`}
          style={{
            left: item.x,
            top: `${item.y * 100}%`,
            transform: `translate(-50%, -100%) scale(${item.scale.toFixed(2)}) rotate(${item.rotate ?? 0}deg)`,
          }}
          aria-hidden
        />
      ))}

      {!reducedMotion &&
        BUBBLES.map((bubble) => (
          <div
            key={bubble.left}
            className={styles.bubble}
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDuration: bubble.duration,
              animationDelay: bubble.delay,
            }}
            aria-hidden
          />
        ))}

      {children}
    </div>
  );
}
