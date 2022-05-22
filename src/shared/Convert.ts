export const toBoolean = (converted: unknown): boolean | null => {
  if (typeof converted !== 'string') {
    return null;
  }

  const lowered = converted.toLowerCase();
  return lowered === 'true' ? true : lowered === 'false' ? false : null;
};
