import React from 'react';
import { useQuery } from '@apollo/client';
import { CampaignListVars, PaginatedCampaignResults } from '../types';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { Grid, Typography } from '@material-ui/core';

export const CampaignInfoList: React.FC = () => {
  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 10, sort: true },
  });

  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <div>
          {data &&
            data.listCampaigns.results.map((campaign, index) => {
              return (
                <Grid container className="campaign-item" key={index} direction={'row'}>
                  <Grid item xs={7}>
                    <Typography>{campaign.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{campaign.status}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{campaign.coiinTotal}</Typography>
                  </Grid>
                </Grid>
              );
            })}
        </div>
      )}
    </div>
  );
};
