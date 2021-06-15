import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { CampaignListVars, GetFundingWalletResponse, PaginatedCampaignResults } from '../types';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { Grid, Typography } from '@material-ui/core';
import { CampaignStatusCard } from './CampaignStatusCard';
import { PurchaseDialog } from './PurchaseDialog';
import { RefetchWallet } from './PaymentsAccount';

interface Props {
  fundingWallet: GetFundingWalletResponse | undefined;
  refetchWallet: RefetchWallet;
}

export const CampaignStatusList: React.FC<Props> = ({ fundingWallet, refetchWallet }) => {
  const { loading, data: campaigns } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: {
      scoped: true,
      skip: 0,
      take: 10,
      sort: true,
      approved: true,
    },
  });
  const [open, setOpen] = useState(false);

  const renderCampaignList = () => {
    let campaignList: JSX.Element[] = [];
    if (loading) {
      return <div />;
    } else if (campaigns && campaigns.listCampaigns) {
      campaignList = campaigns.listCampaigns.results.map((campaign, index) => {
        return (
          <CampaignStatusCard
            key={index}
            campaign={campaign}
            fundingWallet={fundingWallet}
            refetchWallet={refetchWallet}
          />
        );
      });
    }
    if (campaignList.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">No campaigns have been created yet</Typography>
        </Grid>
      );
    }
    return campaignList;
  };

  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <Grid container direction={'column'}>
          <PurchaseDialog open={open} setOpen={setOpen} refetchWallet={refetchWallet} />
          <Grid container item className="campaign-header" direction={'row'}>
            <Grid item xs={2}>
              <Typography component={'div'} variant={'h5'}>
                Campaigns
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={'div'} variant={'h6'}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={'div'} variant={'h6'}>
                Currency
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component={'div'} variant={'h6'}>
                Budget
              </Typography>
            </Grid>
          </Grid>
          {renderCampaignList()}
        </Grid>
      )}
    </div>
  );
};
