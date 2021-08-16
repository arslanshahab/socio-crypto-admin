import React from 'react';
import './CustomSelect.scss';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlProps,
  SelectProps,
  capitalize,
} from '@material-ui/core';

interface Props {
  options: string[];
  label?: string;
  upperCaseOptions?: boolean;
}

const CustomSelect: React.FC<Props & FormControlProps & SelectProps> = ({
  className,
  label,
  value,
  onChange,
  options,
  upperCaseOptions,
  ...others
}) => {
  return (
    <FormControl variant={'outlined'} fullWidth className={`customSelect ${className}`} {...others}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select value={value} onChange={onChange}>
        {options.map((item, index) => (
          <MenuItem alignItems="flex-start" value={item.toLowerCase()} key={index}>
            {upperCaseOptions ? item.toUpperCase() : capitalize(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
