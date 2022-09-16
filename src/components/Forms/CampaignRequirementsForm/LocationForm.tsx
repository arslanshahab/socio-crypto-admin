import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { defaultStates, defaultCountries } from '../../../helpers/globals';
import { LocationRequirementSpecs } from '../../../types';
import CustomButton from '../../CustomButton/CustomButton';
import styles from './requirements.module.css';
import inputStyles from '../../CustomInput/customInput.module.css';

interface Props {
  handleSubmit: (val: LocationRequirementSpecs) => void;
}

const LocationForm: React.FC<Props> = ({ handleSubmit }) => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  return (
    <Box className="w-full p-10 flex flex-col justify-start">
      <p className="text-center text-xl text-gray-700 mb-5">Location Requirements</p>
      <Box className="mb-5">
        <Box className="w-full">
          <FormControl className="w-full customInput" variant="outlined">
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value as string)}
              className={inputStyles.customInput}
            >
              {defaultCountries.map((country) => {
                return (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        {country == 'United States' && (
          <Box className="w-full mt-3">
            <FormControl className="w-full customInput" variant="outlined">
              <InputLabel id="state-label">State</InputLabel>
              <Select value={state} onChange={(e) => setState(e.target.value as string)}>
                {defaultStates.map((state) => {
                  return (
                    <MenuItem className="modal-select-item" key={state} value={state}>
                      {state}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        {country && (
          <Box className="w-full mt-3">
            <TextField
              fullWidth
              variant="outlined"
              name="city"
              label="City"
              className="text-field modal-text-field"
              placeholder={city ? city : 'Required City'}
              onChange={(e) => setCity(e.target.value as string)}
            />
          </Box>
        )}
      </Box>
      <Box className="flex flex-row justify-start items-center mt-5">
        <CustomButton
          className={styles.saveButton}
          onClick={() => {
            const value: LocationRequirementSpecs = {};
            if (city.length) value.city = city;
            if (state.length) value.state = state;
            if (country.length) value.country = country;
            handleSubmit(value);
          }}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default LocationForm;
