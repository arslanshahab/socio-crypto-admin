import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import CampaignTable from '../../components/Campaigns/CampaignTable';
import EmptyCampaigns from '../../components/Campaigns/EmptyCampaigns';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import { PaginatedCampaignResultsV2 } from '../../types';

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<PaginatedCampaignResultsV2>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const campaigns = await axios.get(`${apiURI}/v1/campaign?skip=0&take=130&state=OPEN&status=APPROVED`, {
        withCredentials: true,
      });
      setCampaigns(campaigns.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box className="w-full h-full p-10">
      {loading && (
        <Box className="flex flex-row justify-center items-center w-full h-full">
          <CircularProgress size={45} color="primary" />
        </Box>
      )}
      {!loading && (!campaigns?.items?.length ? <EmptyCampaigns /> : <CampaignTable data={campaigns} />)}
    </Box>
  );
};

export default CampaignsPage;
