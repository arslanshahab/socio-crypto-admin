import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { FileObject } from '../../types';
import { generateRandomId } from '../../helpers/utils';
import { FiPlus } from 'react-icons/fi';
import './fileUpload.scss';

interface FileFormatSizeMap {
  format: string;
  size: number;
  allowedFor: Array<string>;
  unit: string;
}

interface Props {
  onFileSuccess: (data: FileObject, type: string) => void;
  onFileError: (msg: string) => void;
  label: string;
  mediaType: string;
  updateLabel?: string;
  tooltip?: string;
}

const FileUpload: React.FC<Props> = ({ mediaType, onFileError, onFileSuccess, label }) => {
  const inputKey = `${mediaType}-${Math.random()}`;
  const [fileKey, setFileKey] = useState<number>(new Date().getTime());
  const allowedFileType: Array<FileFormatSizeMap> = [
    {
      format: 'image/JPG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage', 'documentImage'],
    },
    { format: 'image/GIF', size: 15, unit: 'MB', allowedFor: ['sharedMedia'] },
    {
      format: 'image/PNG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage', 'documentImage'],
    },
    {
      format: 'image/JPEG',
      size: 5,
      unit: 'MB',
      allowedFor: ['campaignImage', 'sharedMedia', 'raffle', 'organizationImage', 'documentImage'],
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
    <Box className="fileUploadWrapper" key={fileKey}>
      <div className="buttonWrapper">
        <label htmlFor={inputKey}>
          <input
            className="hidden"
            type="file"
            id={inputKey}
            onChange={(e) => {
              handleImage(e, mediaType, onFileSuccess, onFileError);
              setFileKey(new Date().getTime());
            }}
          />
          <Box className="contentWrapper">
            <div className="text">
              <FiPlus /> <p>{label}</p>
            </div>
          </Box>
        </label>
      </div>
    </Box>
  );
};

export default FileUpload;
