import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import styles from './customInput.module.css';

const CustomInput: React.FC<TextFieldProps> = ({ className, onChange, ...others }) => {
  return (
    <TextField
      className={`${styles.customInput} ${className}`}
      onChange={onChange}
      fullWidth
      variant="outlined"
      {...others}
    />
  );
};

export default CustomInput;
