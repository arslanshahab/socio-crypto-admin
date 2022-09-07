import { Box, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { defaultInterests } from '../../../helpers/globals';
import CustomButton from '../../CustomButton/CustomButton';
import { Autocomplete } from '@material-ui/lab';
import styles from './requirements.module.css';
import inputStyles from '../../CustomInput/customInput.module.css';

interface Props {
  handleSubmit: (val: string[]) => void;
  defaultValue: string[];
}

const InterestsForm: React.FC<Props> = ({ handleSubmit, defaultValue }) => {
  const [interests, setInterests] = useState<string[]>(defaultValue);
  return (
    <Box className="w-full flex flex-col justify-start p-10">
      <p className="text-center text-xl text-gray-700 mb-5">Interests Requirements</p>
      <Box className="mb-5">
        <Autocomplete
          className="w-full customInput"
          multiple={true}
          options={defaultInterests}
          getOptionLabel={(option) => option}
          defaultValue={interests}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Keywords"
              placeholder="Add keywords for campaign"
              className={inputStyles.customInput}
            />
          )}
          onChange={(e, val) => {
            setInterests(val);
          }}
        />
      </Box>
      <Box className="flex flex-row justify-start items-center mt-5">
        <CustomButton className={styles.saveButton} onClick={() => handleSubmit(interests)}>
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default InterestsForm;
