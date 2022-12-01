export const uniqueBy = (arr: { [x: string]: any }[], prop: string) => {
  return [...new Map(arr.map((m) => [m[prop], m])).values()];
};
