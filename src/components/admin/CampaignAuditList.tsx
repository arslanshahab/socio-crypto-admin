import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ADMIN_LIST_CAMPAIGN_QUERY } from '../../operations/queries/admin';
import { useHistory } from 'react-router';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Campaign } from '../../types';

interface Props {
  location?: {
    state: {
      reload: boolean;
      deletedCampaignId: string;
    };
  };
}

export const CampaignAuditList: React.FC<Props> = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [skip, setSkip] = useState(0);
  const [getCampaigns, { loading, data }] = useLazyQuery(ADMIN_LIST_CAMPAIGN_QUERY, {
    variables: {
      open: false,
      scoped: true,
      approved: true,
      skip: skip,
      take: 10,
      pendingAudit: true,
    },
    fetchPolicy: 'cache-and-network',
  });
  // console.log('Campaign Audit List', skip);

  const loadData = async (skip: number) => {
    try {
      await getCampaigns();
      await setSkip(skip);
    } catch (e) {
      console.log('Error: Load Data Error');
      console.log(e);
    }
    await setLoaded(true);
  };

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/campaign-audit', { data: data });
  };

  const renderManageWithdrawals = () => {
    if (!loaded) loadData(skip);
    if (loading)
      return (
        <div className="flex justify-center items-center">
          <CircularProgress></CircularProgress>
        </div>
      );
    if (data) {
      if (data.listCampaigns.results.length == 0)
        return (
          <div>
            <p>No Auditable Campaigns Found</p>
          </div>
        );
      return (
        <div className="p-8">
          <h1>Campaigns Pending to be Audited.</h1>
          {skip != 0 ? (
            <Button
              variant="outlined"
              onClick={async () => {
                await loadData(skip - 10);
              }}
            >
              <p>Previous</p>
            </Button>
          ) : (
            <></>
          )}
          {skip + data.listCampaigns.results.length != data.listCampaigns.total ? (
            <Button
              variant="outlined"
              onClick={async () => {
                await loadData(skip + 10);
              }}
            >
              <p>Next</p>
            </Button>
          ) : (
            <></>
          )}
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
                {data &&
                  data.listCampaigns.results.map((x: Campaign, index: number) => (
                    <tr
                      className="hover:bg-gray-100 border-b-2 border-solid border-gray-100 cursor-pointer"
                      key={x.id}
                      onClick={() => handleClick(x)}
                    >
                      <td className="px-7 py-5 text-left capitalize">{x.name}</td>
                      <td className="px-7 py-5 text-left">{x.audited.toString()}</td>
                      <td className="px-7 py-5 text-left">{new Date(parseInt(x.endDate)).toString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        </div>
      );
    }
  };
  return <div>{renderManageWithdrawals()}</div>;
};
