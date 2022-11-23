import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Campaign, PaginatedCampaignResultsV2 } from '../../types';
import Pagination from '../Pagination/Pagination';
import RenderRow from './RenderRow';
import '../../componentsv2/CampaignsTable/campaignsTable.scss';

import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import EmptyCampaigns from './EmptyCampaigns';

const PostCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<PaginatedCampaignResultsV2>();
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const campaigns = await axios.get(
        `${apiURI}/v1/campaign?skip=${skip}&take=${take}&state=CLOSED&status=APPROVED`,
        {
          withCredentials: true,
        },
      );
      setCampaigns(campaigns.data.data);
      setTotal(campaigns.data.data.total);
      setLoading(false);
    };
    fetchData();
  }, [skip]);

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {!loading && !campaigns?.items?.length ? (
        <EmptyCampaigns />
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr className="tableRow">
                <th>Campaign Name</th>
                <th>Budget</th>
                <th>Tier</th>
                <th>Discovery Actions</th>
                <th>TiConversion Actionser</th>
                <th>Cost</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {campaigns &&
                campaigns.items.map((campaign: Campaign, index: number) => {
                  return <RenderRow key={index} campaign={campaign} />;
                })}
            </tbody>
          </table>
          {total > take && (
            <div className="mt-6">
              <Pagination skip={skip} take={take} total={total} getValue={getValue} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCampaigns;
