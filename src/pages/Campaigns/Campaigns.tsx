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
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const campaigns = await axios.get(`${apiURI}/v1/campaign?skip=${skip}&take=${take}&state=OPEN&status=APPROVED`, {
        withCredentials: true,
      });
      setCampaigns(campaigns.data.data);
      setTotal(campaigns.data.data.total);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  return (
    <Box className="w-full h-full p-10">
      {loading && (
        <Box className="flex flex-row justify-center items-center w-full h-full">
          <CircularProgress size={45} color="primary" />
        </Box>
      )}
      {!loading &&
        (!campaigns?.items?.length ? (
          <EmptyCampaigns />
        ) : (
          <CampaignTable data={campaigns} paginationData={{ skip, take, total, getValue }} />
        ))}
    </Box>
  );
};

export default CampaignsPage;
