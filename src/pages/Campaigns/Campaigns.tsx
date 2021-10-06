import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress } from '@material-ui/core';
import { CampaignListVars, PaginatedCampaignResults } from '../../types';
import { LIST_CAMPAIGNS } from '../../operations/queries/campaign';
import CampaignTable from '../../components/Campaigns/CampaignTable';
import EmptyCampaigns from '../../components/Campaigns/EmptyCampaigns';

const CampaignsPage: React.FC = () => {
  const initialEndDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setUTCDate(initialEndDate.getUTCDate() - 7);

  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Box className="w-full h-full p-10">
      {loading && (
        <Box className="flex flex-row justify-center items-center w-full h-full">
          <CircularProgress size={45} color="primary" />
        </Box>
      )}
      {!loading && (!data?.listCampaigns.results.length ? <EmptyCampaigns /> : <CampaignTable data={data} />)}
    </Box>
  );
};

export default CampaignsPage;
