import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { defaultSocialFollowers } from '../../../helpers/globals';
import CustomButton from '../../CustomButton/CustomButton';

interface Props {
  handleSubmit: (val: string) => void;
  defaultValue: string;
}

const SocialFollowersForm: React.FC<Props> = ({ handleSubmit, defaultValue }) => {
  const [followers, setFollowers] = useState<string>(defaultValue);
  return (
    <Box className="w-full flex flex-col justify-start p-10">
      <p className="text-center text-xl text-gray-700 mb-5">Social Media Follower Requirements</p>
      <Box className="mb-5">
        <FormControl className="w-full customInput" variant="outlined">
          <InputLabel id="country-label">Followers Count</InputLabel>
          <Select value={followers} onChange={(e) => setFollowers(e.target.value as string)}>
            {defaultSocialFollowers.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className="flex flex-row justify-start items-center mt-5">
        <CustomButton
          className="w-full h-12 rounded-md text-white text-md border-2 border-blue-800 bg-blue-800"
          onClick={() => handleSubmit(followers)}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default SocialFollowersForm;
