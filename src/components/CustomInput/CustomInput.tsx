import React from 'react';
import './CustomInput.scss';
import { TextField, TextFieldProps } from '@material-ui/core';

const CustomInput: React.FC<TextFieldProps> = ({ className, onChange, ...others }) => {
  return (
    <TextField className={`customInput ${className}`} onChange={onChange} fullWidth variant="outlined" {...others} />
  );
};

export default CustomInput;
