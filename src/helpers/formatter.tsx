export const formatFloat = (val: number, decimals: number): string => val.toFixed(decimals);

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
