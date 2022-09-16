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
              ? 'border-solid border-2 border-cyberYellow text-coolGray bg-lightGray'
              : index === activeStep
              ? 'bg-cyberYellow text-black'
              : 'bg-lightGray text-coolGray'
          }`}
        >
          {label}
          {index < activeStep && <DoneIcon className="ml-2 text-cyberYellow " style={{ fontSize: '20px' }} />}
        </Box>
      ))}
    </Box>
  );
};

export default StepsView;
