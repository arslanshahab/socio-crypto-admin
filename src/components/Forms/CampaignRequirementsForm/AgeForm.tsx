import { Box, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { defaultAges } from '../../../helpers/globals';
import CustomButton from '../../CustomButton/CustomButton';
import { Autocomplete } from '@material-ui/lab';

interface Props {
  handleSubmit: (val: string[]) => void;
  defaultValues: string[];
}

const AgeForm: React.FC<Props> = ({ handleSubmit, defaultValues }) => {
  const [age, setAge] = useState<string[]>(defaultValues);
  return (
    <Box className="w-full flex flex-col justify-start p-10">
      <p className="text-center text-xl text-gray-700 mb-5">Age Requirements</p>
      <Box className="mb-5">
        <Autocomplete
          className="w-full customInput"
          multiple={true}
          options={defaultAges}
          getOptionLabel={(option) => option}
          defaultValue={age}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Keywords" placeholder="Add keywords for campaign" />
          )}
          onChange={(e, val) => {
            setAge(val);
          }}
        />
      </Box>
      <Box className="flex flex-row justify-start items-center mt-5">
        <CustomButton
          className="w-full h-12 rounded-md text-white text-md border-2 border-blue-800 bg-blue-800"
          onClick={() => handleSubmit(age)}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default AgeForm;
