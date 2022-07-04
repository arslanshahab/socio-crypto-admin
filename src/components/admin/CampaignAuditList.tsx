import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Campaign, CampaignTypes } from '../../types';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import Pagination from '../Pagination/Pagination';
import { useHistory } from 'react-router-dom';

export const CampaignAuditList: React.FC = () => {
  const { push } = useHistory();
  const [campaigns, setCampaigns] = useState<CampaignTypes>();
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const campaignsResponse = await axios.get(
        `${apiURI}/v1/campaign?skip=${skip}&take=${take}&state=CLOSED&auditStatus=DEFAULT`,
        {
          withCredentials: true,
        },
      );
      setCampaigns(campaignsResponse.data.data);
      setTotal(campaignsResponse.data.data.total);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-8">
      {campaigns && campaigns?.items?.length <= 0 ? (
        'There is no campaign for auditing'
      ) : (
        <>
          <h1 className="text-blue-900 font-semibold text-2xl pb-3">Campaigns Pending to be Audited.</h1>
          <Box className="w-full pb-10 overflow-scroll">
            <table className="w-full table-auto bg-gray-50">
              <thead>
                <tr className="font-semibold bg-gray-100">
                  <th className="px-7 py-5 text-left">Campaign Name</th>
                  <th className="px-7 py-5 text-left">Audited</th>
                  <th className="px-7 py-5 text-left">Campaign Ended</th>
                </tr>
              </thead>
              <tbody>
                {campaigns &&
                  campaigns.items.map((campaign: Campaign) => (
                    <tr
                      className="hover:bg-gray-100 border-b-2 border-solid border-gray-100 cursor-pointer"
                      key={campaign.id}
                      onClick={() => push(`/dashboard/campaigns/${campaign.id}`, { campaign, isAudit: true })}
                    >
                      <td className="px-7 py-5 text-left capitalize">{campaign.name}</td>
                      <td className="px-7 py-5 text-left">False</td>
                      <td className="px-7 py-5 text-left">{new Date(campaign.endDate).toDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {total > take && (
              <div className="mt-6">
                <Pagination skip={skip} take={take} total={total} getValue={getValue} />
              </div>
            )}
          </Box>
        </>
      )}
    </div>
  );
};
