export const formatFloat = (val: number): string => (val >= 1 ? val.toFixed(2) : val.toFixed(8));

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
