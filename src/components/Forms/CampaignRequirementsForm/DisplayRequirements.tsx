import { Box } from '@material-ui/core';
import React from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  onRemove: (val: string) => void;
  value: string;
}

const DisplayRequirements: React.FC<Props> = ({ value, onRemove }) => {
  return (
    <Box className="px-3 py-3 mt-1 mr-2 rounded-lg bg-gray-300 flex flex-row justify-between items-center">
      <p>{value}</p>
      <CustomButton className="text-gray-900 text-xl w-4 h-4 rounded-full ml-2" onClick={() => onRemove(value)}>
        <CloseIcon style={{ fontSize: 20 }} />
      </CustomButton>
    </Box>
  );
};

export default DisplayRequirements;
