const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export type SanityImageRef = { asset?: { _ref?: string }; alt?: string };

/** Turns a Sanity image asset reference into a CDN URL plus its size. */
export function sanityImage(image: SanityImageRef | null | undefined) {
  const ref = image?.asset?._ref;
  const m = ref?.match(/^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/);
  if (!m || !projectId) return null;
  const [, id, w, h, ext] = m;
  return {
    url: `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${w}x${h}.${ext}`,
    width: Number(w),
    height: Number(h),
    alt: image?.alt ?? "",
  };
}
