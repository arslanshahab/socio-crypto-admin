import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { FileObject } from '../../types';
import icon from '../../assets/svg/camera.svg';
import InfoIcon from '@material-ui/icons/Info';
import { generateRandomId } from '../../helpers/utils';

interface FileFormatSizeMap {
  format: string;
  size: number;
  allowedFor: Array<string>;
  unit: string;
}

interface Props {
  value: FileObject;
  onFileSuccess: (data: FileObject, type: string) => void;
  onFileError: (msg: string) => void;
  label: string;
  mediaType: string;
  updateLabel?: string;
  tooltip?: string;
}

const FileUpload: React.FC<Props> = ({ value, label, mediaType, onFileError, onFileSuccess, updateLabel, tooltip }) => {
  const inputKey = `${mediaType}-${Math.random()}`;
  const allowedFileType: Array<FileFormatSizeMap> = [
    {
      format: 'image/JPG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage'],
    },
    { format: 'image/GIF', size: 15, unit: 'MB', allowedFor: ['sharedMedia'] },
    {
      format: 'image/PNG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage'],
    },
    {
      format: 'image/JPEG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage'],
    },
    {
      format: 'image/SVG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage'],
    },
    { format: 'video/MP4', size: 512, unit: 'MB', allowedFor: ['sharedMedia'] },
  ];

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>, type: string, onSuccess: any, onError: any) => {
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
          onSuccess({ filename: `${type}-${generateRandomId()}.${extension}`, file: data, format: file.type });
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

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Box className="flex flex-col justify-start w-full">
      <label htmlFor={inputKey} className="cursor-pointer">
        <Box className="flex flex-col justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
          {value.file ? (
            value.format.includes('image') ? (
              <Box className="w-full">
                <img src={value.file} alt={mediaType} className="w-full h-44 rounded-md object-cover" />
              </Box>
            ) : (
              <Box className="w-full">
                <video autoPlay={false} src={value.file} controls={true} className="h-44 w-full" />
              </Box>
            )
          ) : (
            <>
              <img src={icon} alt={mediaType} className="w-24" />
            </>
          )}
        </Box>
      </label>
      <input
        className="hidden"
        type="file"
        id={inputKey}
        onChange={(e) => handleImage(e, mediaType, onFileSuccess, onFileError)}
      />
      <label htmlFor={inputKey} className="cursor-pointer">
        <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 rounded-b-lg">
          <p className="text-center text-gray-600 text-md mt-3 pb-1">
            {value.file && updateLabel ? updateLabel : label}
          </p>
          {tooltip && (
            <Tooltip placement="top" title={tooltip}>
              <InfoIcon className="tooltipIcon ml-2" />
            </Tooltip>
          )}
        </Box>
      </label>
    </Box>
  );
};

export default FileUpload;
