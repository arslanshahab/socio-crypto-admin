import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Campaign, PaginatedCampaignResultsV2 } from '../../types';
import Pagination from '../Pagination/Pagination';
import RenderRow from './RenderRow';

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
        <div className="w-full pb-10 overflow-scroll">
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
                <th className="px-7 py-5 text-left"></th>
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
