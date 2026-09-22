import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        /* Font files are content-stable: a change ships under a new name via
         * scripts/fetch-fonts.mjs. Anything in /public is otherwise served
         * with a short max-age, which would re-validate them on every visit. */
        source: "/fonts/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
