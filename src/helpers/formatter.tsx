export const formatFloat = (val: number | undefined, decimals: number): string => (val ? val.toFixed(decimals) : '0');

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
