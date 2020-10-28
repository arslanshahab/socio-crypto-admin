import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FilterDataType } from '../types';

interface Props {
  value: FilterDataType;
  setValue: React.Dispatch<React.SetStateAction<FilterDataType>>;
}

export const DataFilter: React.FC<Props> = ({ value, setValue }) => {
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as FilterDataType);
  };
  return (
    <div>
      <Button
        size={'small'}
        variant={'contained'}
        color={'primary'}
        style={{ margin: '10px' }}
        className="campaign-filter-button"
        onClick={handleClick}
      >
        Select Data Filter
      </Button>
      <FormControl className="campaign-filter-formControl">
        <InputLabel id="data-filter-type-label">Data Filter</InputLabel>
        <Select
          labelId="data-type-label"
          id="data-type-select"
          open={isOpen}
          onClick={handleClick}
          value={value}
          style={{ margin: '15px' }}
          onChange={handleChange}
        >
          <MenuItem value={'postCount'}>Post Count</MenuItem>
          <MenuItem value={'participantCount'}>Participant Count</MenuItem>
          <MenuItem value={'clickCount'}>Click Count</MenuItem>
          <MenuItem value={'viewCount'}>View Count</MenuItem>
          <MenuItem value={'submissionCount'}>Submission Count</MenuItem>
          <MenuItem value={'likeCount'}>Like Count</MenuItem>
          <MenuItem value={'shareCount'}>Share Count</MenuItem>
          <MenuItem value={'commentCount'}>Comment Count</MenuItem>
          <MenuItem value={'totalDiscoveries'}>Total Discoveries</MenuItem>
          <MenuItem value={'totalConversions'}>Total Conversions</MenuItem>
          <MenuItem value={'averagePostCost'}>Average Cost Per Post</MenuItem>
          <MenuItem value={'averageDiscoveryCost'}>Average Discovery Cost</MenuItem>
          <MenuItem value={'averageConversionCost'}>Average Conversion Cost</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
