import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Campaign, CampaignTypes } from '../../types';
import GenericModal from './../GenericModal';
import { CampaignAudit } from './CampaignAudit';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';

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
  const [campaigns, setCampaigns] = useState<CampaignTypes>();
  const [skip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const campaignsResponse = await axios.get(
        `${apiURI}/v1/campaign?skip=${skip}&take=${total}&state=ALL&auditStatus=DEFAULT`,
        {
          withCredentials: true,
        },
      );
      setCampaigns(campaignsResponse.data.data);
      setTotal(campaignsResponse.data.data.total);
      setLoading(false);
    };
    fetchData();
  }, [total, refetch]);

  const handleClick = (data: any) => {
    try {
      showProgressModal(true);
      setAuditDetails(data);
    } catch (e) {
      showProgressModal(false);
    }
  };
  const handleCampaignAuditModal = (value: boolean) => {
    showProgressModal(value);
    setRefetch(!refetch);
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
                  campaigns.items.map((x: Campaign) => (
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
