import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import tableStyles from '../../assets/styles/table.module.css';
import CustomButton from '../CustomButton';
import buttonStyle from '../../assets/styles/customButton.module.css';
import { CircularProgress } from '@material-ui/core';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import headingStyles from '../../assets/styles/heading.module.css';
import { IoChevronBackOutline } from 'react-icons/io5';

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
  const { id }: { id: string } = useParams();
  const { state }: { state: { campaignName: string } } = useLocation();
  const { push } = useHistory();
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participantId, setParticipantId] = useState('');
  const [blackListLoading, setBlackListLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [filterParticipant, setFilterParticipant] = useState([]);

  useEffect(() => {
    const fetchCampaignParticipants = async () => {
      setParticipantsLoading(true);
      const { data } = await axios.get(
        `${apiURI}/v1/participant/campaign-participants?nonZeroScore=true&campaignId=${id}`,
        {
          withCredentials: true,
        },
      );
      setParticipants(data.data.items);
      setParticipantsLoading(false);
    };
    fetchCampaignParticipants();
  }, [id]);

  useEffect(() => {
    const getFilteredParticipants = () => {
      // debugger;
      if (!searchData) return setFilterParticipant(participants);
      const filteredParticipants = participants.filter(
        (participant: Participant) =>
          participant.user.profile.username.toLowerCase().includes(searchData.toLowerCase()) ||
          participant.user.email.toLowerCase().includes(searchData.toLowerCase()),
      );
      setFilterParticipant(filteredParticipants);
    };
    getFilteredParticipants();
  }, [searchData, participants]);

  // Blacklist a participant
  const blackListParticpant = async (participantId: string) => {
    setParticipantId(participantId);
    setBlackListLoading(true);
    await axios.put(`${apiURI}/v1/participant/blacklist/${participantId}`, {}, { withCredentials: true });
    setBlackListLoading(false);
  };

  // Search field
  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    if (!e.target.value) {
      setSearchData('');
    }
  };

  if (participantsLoading) {
    return (
      <div className={tableStyles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex justify-start text-center cursor-pointer p-2 w-20"
        onClick={() => push('/dashboard/campaigns')}
      >
        <div className="flex items-center">
          <IoChevronBackOutline />
        </div>
        <p>Back</p>
      </div>
      <div className="px-6">
        <h2 className="text-blue-800 text-2xl">Participant List</h2>
        <div className="flex justify-between items-center">
          <h2 className="text-blue-800">{state?.campaignName}</h2>
          <input
            type="text"
            name="search"
            value={searchData}
            className=" border-2 p-1 rounded w-64 h-10"
            placeholder="Search by username or email"
            onChange={handleSearchField}
          />
        </div>

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
              {!filterParticipant.length && <p className="p-2">No participant found for this campaign.</p>}
              {filterParticipant &&
                filterParticipant.map((participant: Participant) => (
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
