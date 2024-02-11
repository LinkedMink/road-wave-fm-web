export const isArrayContentsEqual = (first?: unknown[], second?: unknown[]): boolean => {
  if (!first || !second || first.length !== second.length) {
    return false;
  }

  const firstSet = new Set(first);
  return second.every(e => firstSet.has(e));
};

// export const indexToChar = (index: number): string => String.fromCharCode(65 + index);
export const indexToChar = (index: number): string => String(index + 1);
