export const isArrayContentsEqual = (first?: unknown[], second?: unknown[]): boolean => {
  if (!first || !second || first.length !== second.length) {
    return false;
  }

  const firstSet = new Set(first);
  return second.every((e) => firstSet.has(e));
};
