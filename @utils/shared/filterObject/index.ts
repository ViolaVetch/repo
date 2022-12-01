export const filterObject = <T>(obj: T, callback: Function) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(val, key))
  );
};
