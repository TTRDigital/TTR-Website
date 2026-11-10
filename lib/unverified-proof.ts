/*
 * TTR-1454: hide proof figures that TTR OS cannot back up.
 *
 * The 411% organic traffic and 688% top-10 keyword figures are not in any TTR OS
 * row, and nobody has confirmed whose results they are. While HIDE_UNVERIFIED_PROOF
 * is true they are not shown anywhere, whether they come from the code fallbacks
 * or from Sanity (Home page stats, SEO service proof stats).
 *
 * TO RESTORE: set HIDE_UNVERIFIED_PROOF to false once Kia confirms the client,
 * period and source (docs/seo/DECISIONS-FOR-KIA.md, decision 9). Nothing else changes.
 */
export const HIDE_UNVERIFIED_PROOF = true;

const UNVERIFIED = /^(411|688)\s*%$/;

export function withoutUnverifiedStats<T extends { value: string }>(stats: T[] | undefined | null): T[] {
  const list = stats ?? [];
  return HIDE_UNVERIFIED_PROOF ? list.filter((s) => !UNVERIFIED.test(s.value.trim())) : list;
}
