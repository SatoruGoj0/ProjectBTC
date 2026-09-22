/* Geometry of the community mark, shared by the SVG and the WebGL versions.
 * The ring is cut by four gaps centred on the cardinal points, with a node
 * sitting just outside each gap. */

const RING_RADIUS = 15.5;
const RING_WIDTH = 6.5;
const NODE_DISTANCE = 23.5;
const NODE_RADIUS = 5;
const OUTER_RADIUS = 45.4;

/** Angular size of each gap, in radians. Matches NODE_GAP in the 3D mark. */
const GAP_ANGLE = 0.52;

const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const GAP = GAP_ANGLE * RING_RADIUS;
const DASH = CIRCUMFERENCE / 4 - GAP;
/* An SVG circle starts drawing at 3 o'clock, where a node sits — so offset the
 * pattern to put the middle of a gap exactly there. */
const DASH_OFFSET = DASH + GAP / 2;

const NODES = [0, 1, 2, 3].map((i) => {
  const angle = (i * Math.PI) / 2;
  return {
    cx: 50 + Math.cos(angle) * NODE_DISTANCE,
    // SVG y grows downwards; the mark is symmetric, so the sign is cosmetic.
    cy: 50 - Math.sin(angle) * NODE_DISTANCE,
  };
});

/**
 * The community mark as inline SVG, inheriting `currentColor`.
 *
 * Deliberately free of `id` attributes: this renders many times per page, and
 * duplicated mask ids would be invalid markup.
 */
export function MarkIcon({
  className,
  outerRing = true,
}: {
  className?: string;
  outerRing?: boolean;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      {outerRing ? (
        <circle
          cx="50"
          cy="50"
          r={OUTER_RADIUS}
          stroke="currentColor"
          strokeWidth="1.1"
        />
      ) : null}

      <circle
        cx="50"
        cy="50"
        r={RING_RADIUS}
        stroke="currentColor"
        strokeWidth={RING_WIDTH}
        strokeDasharray={`${DASH} ${GAP}`}
        strokeDashoffset={DASH_OFFSET}
      />

      {NODES.map((node) => (
        <circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r={NODE_RADIUS}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
