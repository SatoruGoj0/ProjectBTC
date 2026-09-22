import { ImageResponse } from "next/og";

import en from "@/i18n/dict/en";
import { site } from "@/lib/site";

export const alt = "Baku Tattoo Community";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const VOID = "#06060a";
const BONE = "#ece8e0";
const BLOOD = "#c0392b";

/** One node of the mark: a bone dot ringed in void, which cuts the ring. */
function Node({ top, left }: { top: number; left: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 56,
        height: 56,
        borderRadius: 999,
        background: BONE,
        border: `14px solid ${VOID}`,
        boxSizing: "content-box",
      }}
    />
  );
}

/* Copy is English in every locale on purpose: next/og ships one fallback font,
 * and Cyrillic or Azerbaijani diacritics would render as tofu without shipping
 * font binaries into the build. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: VOID,
          /* Warm rim light echoing the WebGL scene. A gradient rather than a
             blurred div: Satori's blur support leaves visible hard edges. */
          backgroundImage: `radial-gradient(60% 75% at 82% 62%, ${BLOOD}33, ${VOID} 70%)`,
          color: BONE,
          padding: 72,
          position: "relative",
        }}
      >
        {/* The mark */}
        <div
          style={{
            position: "absolute",
            right: 96,
            top: 135,
            width: 360,
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: 999,
              border: `2px solid ${BONE}`,
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 176,
              height: 176,
              borderRadius: 999,
              border: `26px solid ${BONE}`,
            }}
          />
          <Node top={62} left={152} />
          <Node top={152} left={242} />
          <Node top={242} left={152} />
          <Node top={152} left={62} />
        </div>

        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
          }}
        >
          {/* Satori requires an explicit display on any node with more than
              one child, and a text node plus an expression counts as two —
              hence the single interpolated string. */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#86848f",
            }}
          >
            {`Baku · Azerbaijan · ${site.foundedYear}`}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.95,
              letterSpacing: -2,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <div>Baku</div>
            <div>Tattoo</div>
            <div>Community</div>
          </div>

          <div style={{ display: "flex", fontSize: 26, lineHeight: 1.45, color: "#b8b4ac" }}>
            {en.hero.lead}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
