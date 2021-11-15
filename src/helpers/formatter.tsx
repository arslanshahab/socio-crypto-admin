export const formatFloat = (val: string | number): string => {
  if (!val) {
    return '0';
  }
  if (typeof val === 'string') {
    val = parseFloat(val);
  }
  return val >= 1 ? val.toFixed(2) : val.toFixed(8);
};

export const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
