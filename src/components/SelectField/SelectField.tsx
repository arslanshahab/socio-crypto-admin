import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IProps {
  searchFieldData: string[];
  title: string;
}

const SelectField = (props: IProps) => {
  //! Hooks
  const [search, setSearch] = useState('');

  //! Handle OnChange
  const handleChange = (event: SelectChangeEvent) => {
    setSearch(event.target.value);
  };

  //! Destructuring
  const { searchFieldData } = props;
  return (
    <div>
      <FormControl sx={{ width: 280 }}>
        <InputLabel id="demo-simple-select-helper-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label3"
          id="demo-simple-select-helper2"
          value={search}
          label="Age"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {searchFieldData?.map((x, index) => (
            <MenuItem key={index} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectField;
