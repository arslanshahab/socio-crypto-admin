import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { FileObject } from '../../types';
import icon from '../../assets/svg/camera.svg';
import { handleImage } from '../../helpers/fileHandler';
import InfoIcon from '@material-ui/icons/Info';

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
  return (
    <Box className="flex flex-col justify-start w-full pl-3">
      <label htmlFor={mediaType} className="cursor-pointer">
        <Box className="flex flex-col justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
          {value.file ? (
            value.format.includes('image') ? (
              <Box className="w-full">
                <img src={value.file} alt={mediaType} className="w-full h-44 mb-2 rounded-md object-cover" />
              </Box>
            ) : (
              <Box className="w-full">
                <video autoPlay={false} height="100%" width="100%" src={value.file} controls={true} />
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
        id={mediaType}
        onChange={(e) => handleImage(e, mediaType, onFileSuccess, onFileError)}
      />
      <label>
        <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 rounded-b-lg">
          <p className="text-center text-gray-600 text-lg mt-1 pb-1">
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
