import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_LIST_CAMPAIGN_QUERY } from '../../operations/queries/admin';
import { Box, CircularProgress } from '@material-ui/core';
import { Campaign } from '../../types';
import GenericModal from './../GenericModal';
import { CampaignAudit } from './CampaignAudit';

interface Props {
  location?: {
    state: {
      reload: boolean;
      deletedCampaignId: string;
    };
  };
}

export const CampaignAuditList: React.FC<Props> = () => {
  const [progressModal, showProgressModal] = useState(false);
  const [auditDetails, setAuditDetails] = useState();

  const { loading, data, refetch } = useQuery(ADMIN_LIST_CAMPAIGN_QUERY, {
    variables: {
      open: false,
      scoped: true,
      approved: true,
      take: 20,
      pendingAudit: true,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleClick = (data: any) => {
    try {
      showProgressModal(true);
      setAuditDetails(data);
    } catch (e) {
      showProgressModal(false);
    }
  };
  const handleCampaignAuditModal = (value: any) => {
    showProgressModal(value);
    refetch();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <div className="p-8">
      <GenericModal
        open={progressModal}
        onClose={() => showProgressModal(false)}
        persist={false}
        size="small"
        showCloseIcon={true}
      >
        <CampaignAudit auditDetails={auditDetails} handleCampaignAuditModal={handleCampaignAuditModal} />
      </GenericModal>

      {data.listCampaigns.results?.length <= 0 ? (
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
                {data &&
                  data.listCampaigns.results.map((x: Campaign, index: number) => (
                    <tr
                      className="hover:bg-gray-100 border-b-2 border-solid border-gray-100 cursor-pointer"
                      key={x.id}
                      onClick={() => handleClick(x)}
                    >
                      <td className="px-7 py-5 text-left capitalize">{x.name}</td>
                      <td className="px-7 py-5 text-left">False</td>
                      <td className="px-7 py-5 text-left">{new Date(parseInt(x.endDate)).toDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        </>
      )}
    </div>
  );
};
