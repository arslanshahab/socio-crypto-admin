import { Box, Tooltip } from '@material-ui/core';
import React from 'react';

interface Props {
  list: Array<string>;
  activeStep: number;
}

const StepsView: React.FC<Props> = ({ list, activeStep }) => {
  return (
    <Box className="w-full flex flex-row justify-center">
      {list.map((label, index) => (
        <Box
          key={index}
          className={`flex flex-row justify-evenly items-center ${index < list.length - 1 ? 'w-1/5' : ''}`}
        >
          <Tooltip placement="top" title={label}>
            <Box
              className={`flex flex-row justify-center items-center w-12 h-12 rounded-full text-xl ${
                activeStep >= index ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </Box>
          </Tooltip>
          {index < list.length - 1 && (
            <Box className={`w-5/6 h-2 ${activeStep > index ? 'bg-blue-800' : 'bg-gray-200'}`} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StepsView;
