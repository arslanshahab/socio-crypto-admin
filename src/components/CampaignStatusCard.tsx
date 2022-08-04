import React, { useState } from 'react';
import { Campaign, GetFundingWalletResponse } from '../types';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { PurchaseDialog } from './PurchaseDialog';
import { capitalize } from '../helpers/formatter';
import { coldWallet } from './PaymentsAccount';

interface Props {
  campaign: Campaign;
  fundingWallet: GetFundingWalletResponse | undefined;
  // refetchWallet: RefetchWallet;
}

export const CampaignStatusCard: React.FC<Props> = ({ campaign, fundingWallet }) => {
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isCoiin, setIsCoiin] = useState(false);

  const handleClick = () => {
    if (fundingWallet && fundingWallet.getFundingWallet) {
      const currencyType = campaign.crypto && campaign.crypto.type ? campaign.crypto.type : 'coiin';
      const walletCurrency = fundingWallet.getFundingWallet.currency.find((currency) => currency.type === currencyType);
      setBalance((walletCurrency && walletCurrency.balance) || 0);
      setIsCoiin(currencyType === 'coiin');
      setOpen(currencyType !== 'coiin');
    }
  };

  return (
    <div>
      <PurchaseDialog open={isCoiin} setOpen={setIsCoiin} balance={balance} amount={Number(campaign.coiinTotal)} />
      <Dialog open={open}>
        <DialogTitle>Refill Funding Wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Please deposit {Number(campaign.coiinTotal) - balance}{' '}
              {(campaign.crypto && campaign.crypto.type.toUpperCase()) || 'COIIN'} into your funding wallet by sending
              it to this address:
            </Typography>
          </DialogContentText>
          <DialogContentText>{coldWallet}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} color={'primary'} onClick={() => setOpen(false)}>
            <Typography>Okay</Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container item direction={'row'} className="list-row">
        <Grid item xs={2} className="list-item">
          <Typography>{campaign.name}</Typography>
        </Grid>
        <Grid item xs={2} className="list-item">
          <Typography>{campaign.status}</Typography>
        </Grid>
        <Grid item xs={2} className="list-item">
          <Typography>{(campaign.crypto && capitalize(campaign.crypto.type)) || 'Coiin'}</Typography>
        </Grid>
        <Grid item xs={2} className="list-item">
          <Typography>{campaign.coiinTotal}</Typography>
        </Grid>
        {campaign.status === 'INSUFFICIENT_FUNDS' && (
          <Grid item className="list-button-container">
            <Button variant={'outlined'} size={'small'} color={'primary'} onClick={() => handleClick()}>
              <Typography component={'div'}>Fund</Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
