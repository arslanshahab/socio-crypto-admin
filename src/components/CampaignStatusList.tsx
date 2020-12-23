import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CampaignListVars, PaginatedCampaignResults } from '../types';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { CampaignStatusCard } from './CampaignStatusCard';
import { PurchaseDialog } from './PurchaseDialog';

interface Props {
  balance: number;
}

export const CampaignStatusList: React.FC<Props> = ({ balance }) => {
  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 10, sort: true },
  });
  const [campaignsToFund, setCampaignToFund] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [makePurchase, setMakePurchase] = useState(false);

  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <Grid container direction={'column'}>
          <PurchaseDialog open={makePurchase} setOpen={setMakePurchase} amount={totalCost - balance} />
          <Dialog fullScreen open={insufficientFunds} onClose={() => setInsufficientFunds(false)}>
            <DialogTitle>Insufficient Funds</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You do not have enough Coiin to fund anymore campaigns. Please refill it if you wish to continue.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setInsufficientFunds(false)} color="primary" variant={'contained'}>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Grid container item className="campaign-header" direction={'row'}>
            <Grid item xs={3}>
              <Typography component={'div'} variant={'h5'}>
                Campaigns
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component={'div'} variant={'h6'}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={'div'} variant={'h6'}>
                Cost (Coiin)
              </Typography>
            </Grid>
            <Grid container item xs={2} direction={'column'}>
              <Grid item>
                <Button
                  variant={'outlined'}
                  size={'small'}
                  color={'primary'}
                  style={{ marginBottom: '5px' }}
                  onClick={() => setMakePurchase(true)}
                >
                  <Typography component={'div'}>Fund (Cost: {totalCost !== 0 ? totalCost - balance : 0})</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {data &&
            data.listCampaigns.results.map((campaign, index) => {
              return (
                <CampaignStatusCard
                  key={index}
                  campaign={campaign}
                  setCampaignToFund={setCampaignToFund}
                  campaignsToFund={campaignsToFund}
                  setTotalCost={setTotalCost}
                  balance={balance}
                  totalCost={totalCost}
                  setInsufficientFunds={setInsufficientFunds}
                />
              );
            })}
        </Grid>
      )}
    </div>
  );
};
