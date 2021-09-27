import { Box } from '@material-ui/core';
import React from 'react';
import DoneIcon from '@material-ui/icons/Done';

interface Props {
  list: Array<string>;
  activeStep: number;
}

const StepsView: React.FC<Props> = ({ list, activeStep }) => {
  return (
    <Box className="w-full flex flex-row justify-center space-x-3">
      {list.map((label, index) => (
        <Box
          key={label}
          className={`w-1/5 p-3 flex flex-row justify-center items-center bg-gray-100 rounded-md text-xs	 ${
            index < activeStep
              ? 'bg-blue-700 text-white'
              : index === activeStep
              ? 'bg-blue-100 border-solid border-2 border-blue-700'
              : 'bg-gray-50 text-gray-400'
          }`}
        >
          {label}
          {index < activeStep && <DoneIcon className="ml-2" style={{ fontSize: '20px' }} />}
        </Box>
      ))}
    </Box>
  );
};

export default StepsView;
