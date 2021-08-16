interface FileFormatSizeMap {
  format: string;
  size: number;
  allowedFor: Array<string>;
  unit: string;
}

const allowedFileType: Array<FileFormatSizeMap> = [
  { format: 'image/JPG', size: 5, unit: 'MB', allowedFor: ['campaignImage', 'sharedMedia', 'raffle'] },
  { format: 'image/GIF', size: 15, unit: 'MB', allowedFor: ['sharedMedia'] },
  { format: 'image/PNG', size: 5, unit: 'MB', allowedFor: ['campaignImage', 'sharedMedia', 'raffle'] },
  { format: 'image/JPEG', size: 5, unit: 'MB', allowedFor: ['campaignImage', 'sharedMedia', 'raffle'] },
  { format: 'image/SVG', size: 5, unit: 'MB', allowedFor: ['campaignImage', 'sharedMedia', 'raffle'] },
  { format: 'video/MP4', size: 512, unit: 'MB', allowedFor: ['shared-media'] },
];

export const reloadWindow = (): void => window.location.reload();

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// eslint-disable-next-line
export const handleImage = (event: React.ChangeEvent<HTMLInputElement>, type: string, onSuccess: any, onError: any) => {
  const files = event.target.files;
  if (files && files.length) {
    const file = files[0];
    const extension = file.type ? file.type.split('/')[1] : '';
    const fileFormatSizeMap = getFileFormatSizeMapping(file.type, type);
    if (!fileFormatSizeMap) {
      event.target.value = '';
      onError(
        `Selected file type '${extension}' is not allowed, Following are allowed types: ${getAllowedFileTypes(type)}`,
      );
    } else {
      if (fileSizeInMB(file.size) > fileFormatSizeMap.size) {
        onError(
          `File size is greater than allowed limit, Maximum allowed size for ${extension} is ${fileFormatSizeMap.size}${fileFormatSizeMap.unit}`,
        );
        event.target.value = '';
      }
      toBase64(file).then((data) => {
        onSuccess({ filename: `${type}.${extension}`, file: data, format: file.type }, type);
      });
    }
  }
};

const fileSizeInMB = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

const getFileFormatSizeMapping = (format: string, type: string): FileFormatSizeMap | undefined => {
  if (!format) return undefined;
  return allowedFileType.find(
    (item) => item.format.toLowerCase() == format.toLowerCase() && item.allowedFor.includes(type),
  );
};

const getAllowedFileTypes = (type: string): string => {
  const types = allowedFileType
    .filter((item) => item.allowedFor.includes(type))
    .map((a) => a.format)
    .join(', ');
  return types;
};

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
