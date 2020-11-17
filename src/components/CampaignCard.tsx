import React from 'react';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Campaign, GetCurrentTierResults, GetCampaignVars, GetTotalCampaignMetricsResults } from '../types';
import { GET_CURRENT_TIER, GET_TOTAL_CAMPAIGN_METRICS } from '../operations/queries/campaign';

interface Props {
  campaign: Campaign;
  setChecked: React.Dispatch<React.SetStateAction<number>>;
  checkedIndex: number;
  index: number;
}

export const CampaignCard: React.FC<Props> = ({ campaign, checkedIndex, setChecked, index }) => {
  const { loading: loadingStatus, data: statusData } = useQuery<GetCurrentTierResults, GetCampaignVars>(
    GET_CURRENT_TIER,
    {
      variables: { campaignId: campaign.id },
    },
  );
  const { loading: loadingMetrics, data: metricsData } = useQuery<GetTotalCampaignMetricsResults, GetCampaignVars>(
    GET_TOTAL_CAMPAIGN_METRICS,
    {
      variables: { campaignId: campaign.id },
    },
  );
  const handleClick = () => {
    setChecked(index);
  };
  const getStatus = () => {
    const endDate = new Date(Number(campaign.endDate));
    const now = new Date();
    return now < endDate ? <Typography>Open</Typography> : <Typography>Closed</Typography>;
  };
  const numberOfTiers = Object.keys(campaign.algorithm.tiers).length;
  const budget = campaign.algorithm.tiers[numberOfTiers].totalCoiins;
  return (
    <div>
      <Grid container spacing={5}>
        <Grid item container xs={1}>
          <Grid item>
            <Checkbox
              checked={checkedIndex === index}
              onClick={handleClick}
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={3}>
          <Grid item>
            <Typography className="campaign-name">{campaign.name}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>{`$${budget}`}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>
              {loadingStatus ? (
                <p>loading...</p>
              ) : (
                <div>{`${statusData && statusData.getCurrentCampaignTier.currentTier}`}</div>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>
              {loadingMetrics ? (
                <p>loading...</p>
              ) : (
                <div>
                  {metricsData &&
                    metricsData.getCampaignMetrics.shareCount +
                      metricsData.getCampaignMetrics.commentCount +
                      metricsData.getCampaignMetrics.likeCount}
                </div>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>
              {loadingMetrics ? (
                <p>loading...</p>
              ) : (
                <div>
                  {metricsData &&
                    metricsData.getCampaignMetrics.clickCount +
                      metricsData.getCampaignMetrics.viewCount +
                      metricsData.getCampaignMetrics.submissionCount}
                </div>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>
              {loadingStatus ? (
                <p>loading...</p>
              ) : (
                <div>{`$${statusData && statusData.getCurrentCampaignTier.currentTotal}`}</div>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={1}>
          <Grid item>
            <Typography>{loadingStatus ? <p>loading...</p> : <div>{getStatus()}</div>}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
