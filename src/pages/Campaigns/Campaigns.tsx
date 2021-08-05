import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { CampaignListVars, PaginatedCampaignResults } from '../../types';
import { LIST_CAMPAIGNS } from '../../operations/queries/campaign';
import { useHistory } from 'react-router-dom';
import RenderRow from './RenderRow';

const CampaignsPage: React.FC = () => {
  const history = useHistory();
  const initialEndDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setUTCDate(initialEndDate.getUTCDate() - 7);

  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 10, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Box className="w-full h-full p-10">
      {loading && (
        <Box className="flex flex-row justify-center items-center w-full h-full">
          <CircularProgress size={45} color="primary" />
        </Box>
      )}
      {!loading &&
        (!data?.listCampaigns.results.length ? (
          <Box className="flex flex-col justify-center items-center w-full h-full">
            <p className="text-xl mb-2">No Campaigns Found</p>
            <Button
              className="new-campaign-button"
              variant="outlined"
              color="primary"
              onClick={(e) => {
                history.push('/dashboard/newCampaign');
              }}
            >
              Create your first campaign
            </Button>
          </Box>
        ) : (
          <Box className="w-full">
            <table className="w-full table-auto bg-gray-50">
              <thead>
                <tr className="font-semibold bg-gray-100">
                  <th className="px-7 py-5 text-left">Campaign Name</th>
                  <th className="px-7 py-5 text-left">Budget</th>
                  <th className="px-7 py-5 text-left">Tier</th>
                  <th className="px-7 py-5 text-left">Discovery Actions</th>
                  <th className="px-7 py-5 text-left">TiConversion Actionser</th>
                  <th className="px-7 py-5 text-left">Cost</th>
                  <th className="px-7 py-5 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.listCampaigns.results.map((campaign, index) => {
                    return <RenderRow key={index} campaign={campaign} />;
                  })}
              </tbody>
            </table>
          </Box>
        ))}
    </Box>
  );
};

export default CampaignsPage;
