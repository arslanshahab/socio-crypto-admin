import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import AutoCompleteDropDown from '../AutoCompleteDropDown';
import tableStyles from '../../assets/styles/table.module.css';
import useEffectSkipFirst from '../../hooks/useEffectSkipFirst';
import CustomButton from '../CustomButton';
import buttonStyle from '../../assets/styles/customButton.module.css';
import { CircularProgress } from '@material-ui/core';

type Participant = {
  id: string;
  user: {
    email: string;
    profile: {
      username: string;
    };
  };
  participationScore: string;
  createdAt: string;
  blackList: boolean;
};

const CampaignDetails: React.FC = () => {
  const [campaignId, setCamapignId] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participantId, setParticipantId] = useState('');
  const [blackListLoading, setBlackListLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const campaignsResponse = await axios.get(`${apiURI}/v1/campaign/campaigns-lite`, {
        withCredentials: true,
      });
      setCampaigns(campaignsResponse.data.data);
    };
    fetchData();
  }, []);

  const fetchCampaignParticipants = async () => {
    if (campaignId) {
      setParticipantsLoading(true);
      const { data } = await axios.get(
        `${apiURI}/v1/participant/campaign-participants?nonZeroScore=true&campaignId=${campaignId}`,
        {
          withCredentials: true,
        },
      );
      setParticipants(data.data.items);
      setParticipantsLoading(false);
    }
  };

  // Blacklist a participant
  const blackListParticpant = async (participantId: string) => {
    setParticipantId(participantId);
    setBlackListLoading(true);
    await axios.put(`${apiURI}/v1/participant/blacklist/${participantId}`, {}, { withCredentials: true });
    setBlackListLoading(false);
  };

  // Get campaign id from AutoCompleteDropDown
  const getCampaignId = (id: string) => {
    setCamapignId(id);
  };
  useEffectSkipFirst(fetchCampaignParticipants, [campaignId]);

  if (participantsLoading) {
    return (
      <div className={tableStyles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>All Campaign List</h1>
      <div className="w-4/5">
        <AutoCompleteDropDown options={campaigns} label="Campaign" getCampaignId={(id) => getCampaignId(id || '')} />
      </div>
      <div className="mt-8">
        <h1>Participant Table</h1>
        <div className={tableStyles.tableWrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.tableHeadRow}>
                <th className={tableStyles.tableColumn}>Username</th>
                <th className={tableStyles.tableColumn}>Email</th>
                <th className={tableStyles.tableColumn}>Participation Score</th>
                <th className={tableStyles.tableColumn}>Participation Date</th>
                <th className={tableStyles.tableColumn}>Action</th>
              </tr>
            </thead>
            <tbody>
              {participants &&
                participants.map((participant: Participant) => (
                  <tr className={tableStyles.tableBodyRow} key={participant.id}>
                    <td className={tableStyles.tableColumn}>{participant.user.profile.username}</td>
                    <td className={tableStyles.tableColumn}>{participant.user.email}</td>
                    <td className={tableStyles.tableColumn}>{participant.participationScore}</td>
                    <td className={tableStyles.tableColumn}>{new Date(participant.createdAt).toDateString()}</td>
                    <td className={tableStyles.tableColumn}>
                      {!participant.blackList && (
                        <CustomButton
                          className={buttonStyle.secondaryButton}
                          onClick={() => blackListParticpant(participant.id)}
                          loading={blackListLoading && participantId === participant.id}
                        >
                          Black List
                        </CustomButton>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
