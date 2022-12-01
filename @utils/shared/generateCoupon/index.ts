export const generateCoupon = (
  inits: string,
  fp: number,
  lp: number
): string => {
  const entry = inits;
  const first = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, fp)
    .toUpperCase();
  const second = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, lp)
    .toUpperCase();
  return `${entry}-${first}-${second}`;
};
