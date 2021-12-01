import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { GetUserAllCampaigns, UserCampaignSingle } from '../../types';

interface IProps {
  options: UserCampaignSingle[];
  label: string;
  campaignsData?: GetUserAllCampaigns | undefined;
  getCampaignId: (campaignId: string | undefined) => void;
}

export default function AutoCompleteDropDown(props: IProps): JSX.Element {
  const [value, setValue] = React.useState<UserCampaignSingle | null>(props.options[0]);
  const [inputValue, setInputValue] = React.useState<string>();
  const { getCampaignId } = props;

  // Handle OnChange
  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: UserCampaignSingle | null) => {
    setValue(newValue);
    setInputValue(newValue?.id || '-1');
    const campaignId = newValue?.id;
    getCampaignId(campaignId);
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        inputValue={inputValue}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        // }}
        id="controllable-states-demo"
        options={props.options}
        getOptionLabel={(option) => option.name.concat(option.id)}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        size="small"
      />
    </div>
  );
}
