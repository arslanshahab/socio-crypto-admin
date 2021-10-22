export const reloadWindow = (): void => window.location.reload();

export const dataURLtoFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const matchString = arr[0].match(/:(.*?);/);
  const mime = matchString ? matchString[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
