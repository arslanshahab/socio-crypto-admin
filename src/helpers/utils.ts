import React from 'react';
import { updateCampaignState } from '../redux/slices/campaign';
import { ToastContent, toast } from 'react-toastify';

interface FileFormatSizeMap {
  format: string;
  size: number;
  allowedFor: Array<string>;
  unit: string;
}

const allowedFileType: Array<FileFormatSizeMap> = [
  { format: 'image/JPG', size: 5, unit: 'MB', allowedFor: ['campaign-image', 'shared-media', 'raffle'] },
  { format: 'image/GIF', size: 15, unit: 'MB', allowedFor: ['shared-media'] },
  { format: 'image/PNG', size: 5, unit: 'MB', allowedFor: ['campaign-image', 'shared-media', 'raffle'] },
  { format: 'image/JPEG', size: 5, unit: 'MB', allowedFor: ['campaign-image', 'shared-media', 'raffle'] },
  { format: 'image/SVG', size: 5, unit: 'MB', allowedFor: ['campaign-image', 'shared-media', 'raffle'] },
  { format: 'video/MP4', size: 512, unit: 'MB', allowedFor: ['shared-media'] },
  // { format: 'video/WebM', size: 512, unit: 'MB', allowedFor: ['shared-media'] },
  // { format: 'video/OGG', size: 512, unit: 'MB', allowedFor: ['shared-media'] },
];

export const reloadWindow = (): void => window.location.reload();

// eslint-disable-next-line
export const handleImage = (event: React.ChangeEvent<HTMLInputElement>, dispatch: any, type: string) => {
  const files = event.target.files;
  if (files && files.length) {
    const file = files[0];
    const extension = file.type ? file.type.split('/')[1] : '';
    const fileFormatSizeMap = getFileFormatSizeMapping(file.type, type);
    if (!fileFormatSizeMap) {
      showErrorMessage(
        `Selected file type '${extension}' is not allowed, Following are allowed types: ${getAllowedFileTypes(type)}`,
      );
      return '';
    }
    if (fileSizeInMB(file.size) > fileFormatSizeMap.size) {
      showErrorMessage(
        `File size is greater than allowed limit, Maximum allowed size for ${extension} is ${fileFormatSizeMap.size}${fileFormatSizeMap.unit}`,
      );
      return '';
    }
    if (type == 'raffle') {
      dispatch(
        updateCampaignState({
          cat: 'config',
          key: 'raffleImage',
          val: { filename: `raffle.${extension}`, file: file, format: file.type },
        }),
      );
    } else if (type == 'campaign-image') {
      dispatch(
        updateCampaignState({
          cat: 'image',
          key: 'image',
          val: { filename: `banner.${extension}`, file: file, format: file.type },
        }),
      );
    } else if (type == 'shared-media') {
      dispatch(
        updateCampaignState({
          cat: 'image',
          key: 'sharedMedia',
          val: { filename: `sharedMedia.${extension}`, file: file, format: file.type },
        }),
      );
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

export const showErrorMessage = (msg: string): ToastContent => {
  return toast.error(msg, {
    position: 'bottom-center',
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
