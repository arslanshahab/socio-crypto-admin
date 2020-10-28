import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { TimeFilterOptions } from '../types';

interface Props {
  value: TimeFilterOptions;
  setValue: React.Dispatch<React.SetStateAction<TimeFilterOptions>>;
}

export const TimeFilter: React.FC<Props> = ({ value, setValue }) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as TimeFilterOptions);
  };
  return (
    <div>
      <Button
        size={'small'}
        variant={'contained'}
        color={'primary'}
        style={{ margin: '15px' }}
        className="campaign-filter-button"
        onClick={handleClick}
      >
        Select Time Filter
      </Button>
      <FormControl className="campaign-filter-formControl">
        <InputLabel id="time-filter-type-label">Time Filter</InputLabel>
        <Select
          labelId="time-type-label"
          id="time-type-select"
          open={isOpen}
          onClick={handleClick}
          value={value}
          onChange={handleChange}
          style={{ margin: '15px' }}
        >
          <MenuItem value={'hour'}>Hour</MenuItem>
          <MenuItem value={'day'}>Day</MenuItem>
          <MenuItem value={'week'}>Week</MenuItem>
          <MenuItem value={'month'}>Month</MenuItem>
          <MenuItem value={'year'}>Year</MenuItem>
          <MenuItem value={'all'}>All</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
