import { MarkIcon } from "./MarkIcon";

/**
 * Infinite horizontal band. The track holds the items twice and translates by
 * exactly -50%, so the loop is seamless with no JS measuring anything.
 */
export function Marquee({
  items,
  duration = 46,
  reverse = false,
  className,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`marquee-wrap relative overflow-hidden py-6 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="marquee"
        data-reverse={String(reverse)}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex shrink-0 items-center">
            <span className="display display-md px-[clamp(1rem,2.4vw,2.5rem)] text-bone/80">
              {item}
            </span>
            <MarkIcon className="h-[0.9em] w-[0.9em] shrink-0 text-blood/70" />
          </span>
        ))}
      </div>

      {/* Feathered edges so the band dissolves instead of being cut off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
