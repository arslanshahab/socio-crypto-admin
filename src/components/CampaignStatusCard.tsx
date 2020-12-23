import React, { useState } from 'react';
import { Campaign } from '../types';
import { Grid, Typography, Checkbox } from '@material-ui/core';

interface Props {
  campaign: Campaign;
  setCampaignToFund: React.Dispatch<React.SetStateAction<string[]>>;
  campaignsToFund: string[];
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  totalCost: number;
  setInsufficientFunds: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CampaignStatusCard: React.FC<Props> = ({
  campaign,
  setTotalCost,
  campaignsToFund,
  setCampaignToFund,
  totalCost,
  setInsufficientFunds,
  balance,
}) => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = (coiinTotal: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setChecked((prevState) => !prevState);
    if (!campaignsToFund.includes(value)) {
      setTotalCost((prevState) => prevState + Number(coiinTotal));
      if (totalCost > balance) setInsufficientFunds(true);
      setCampaignToFund((prevState) => prevState.concat(value));
    } else {
      setCampaignToFund((prevState) => prevState.filter((item) => value !== item));
      setTotalCost((prevState) => prevState - Number(coiinTotal));
    }
  };

  return (
    <Grid container item direction={'row'} className="list-row">
      <Grid item xs={3} className="list-item">
        <Typography>{campaign.name}</Typography>
      </Grid>
      <Grid item xs={3} className="list-item">
        <Typography>{campaign.status}</Typography>
      </Grid>
      <Grid item xs={2} className="list-item">
        <Typography>{campaign.coiinTotal}</Typography>
      </Grid>
      {campaign.status === 'INSUFFICIENT_FUNDS' && (
        <Grid item xs={2}>
          <Checkbox checked={isChecked} color={'primary'} onChange={handleChange(campaign.coiinTotal)} />
        </Grid>
      )}
    </Grid>
  );
};
