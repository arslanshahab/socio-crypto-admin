import React from 'react';
import './CircularProgressWithLabel.scss';
import { CircularProgress, CircularProgressProps, Box } from '@material-ui/core';

const CircularProgressWithLabel: React.FC<CircularProgressProps> = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" size={42} className="loader" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p className="text-xs">{props.value}%</p>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
