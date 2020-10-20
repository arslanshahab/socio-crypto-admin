import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Paper, Typography } from '@material-ui/core';
import { CampaignListVars, PaginatedCampaignResults } from '../types';
import { CampaignCard } from './CampaignCard';

const LIST_CAMPAIGNS = gql(`
    query listCampaigns($open:Boolean!, $skip: Int!, $take:Int!) {
      listCampaigns(open:$open, skip:$skip, take:$take){
        results{
          id
          name
          coiinTotal
          algorithm
          totalParticipationScore
          beginDate
          description
          endDate
          company
          imagePath
          tagline
          participants {
            id
            metrics {
              clickCount
            }
            user {
              id
            }
          }
        }
        total
      }
    }
`);

export const CampaignsList: React.FC = () => {
  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, open: true, skip: 0, take: 10 },
  });
  return (
    <div className="campaign-list">
      <Paper className="campaign-graph">Graphs</Paper>
      <Paper>
        <Grid container spacing={5}>
          <Grid item container xs={2}>
            <Typography>Campaign</Typography>
          </Grid>
          <Grid item container xs={2}>
            <Typography>Budget</Typography>
          </Grid>
          <Grid item container xs={2}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item container xs={2}>
            <Typography>Discovery Actions</Typography>
          </Grid>
          <Grid item container xs={2}>
            <Typography>Conversion Actions</Typography>
          </Grid>
          <Grid item container xs={2}>
            <Typography>Cost</Typography>
          </Grid>
        </Grid>
        {loading ? (
          <p>loading ...</p>
        ) : (
          <div>
            {data &&
              data.listCampaigns.results.map((campaign) => {
                return <CampaignCard key={campaign.id} name={campaign.name} />;
              })}
          </div>
        )}
      </Paper>
    </div>
  );
};
