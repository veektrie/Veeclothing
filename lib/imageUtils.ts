/**
 * Generates a tiny base64-encoded SVG blur placeholder for use with next/image.
 * Usage: <Image placeholder="blur" blurDataURL={getBlurDataURL()} ... />
 *
 * The shimmer effect gives a premium animated loading feel.
 */
export function getBlurDataURL(w = 8, h = 10): string {
  // A simple grey SVG that is valid as a blurDataURL
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="#E2E8F0"/>
    </svg>
  `;
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * A shimmer-style blur placeholder — more premium, slightly animated look.
 * Use this for hero / featured images.
 */
export function getShimmerDataURL(w = 8, h = 10): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E2E8F0"/>
          <stop offset="50%" stop-color="#F1F5F9"/>
          <stop offset="100%" stop-color="#E2E8F0"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>
  `;
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
