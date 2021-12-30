import * as React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetUserCampaigns, UserCampaignSingle } from '../../types';

interface AutoCompleteDropdownProps {
  options: UserCampaignSingle[];
  label: string;
  campaignsData?: GetUserCampaigns | undefined;
  getCampaignId: (campaignId: string | undefined) => void;
}

export default function AutoCompleteDropDown(props: AutoCompleteDropdownProps): JSX.Element {
  const [value, setValue] = React.useState<UserCampaignSingle | null>(props.options[0]);
  const [inputValue, setInputValue] = React.useState<string>();
  const { getCampaignId } = props;

  // Handle OnChange
  const handleChange = (event: any, newValue: UserCampaignSingle | null) => {
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
        id="controllable-states-demo"
        options={props.options}
        getOptionLabel={(option) => `${option.name} (${option.id.substring(option.id.length, option.id.length - 2)})`}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        size="small"
        className="w-60"
      />
    </div>
  );
}
