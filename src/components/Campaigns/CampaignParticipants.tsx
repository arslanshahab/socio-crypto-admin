import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import tableStyles from '../../assets/styles/table.module.css';
import CustomButton from '../CustomButton';
import buttonStyle from '../../assets/styles/customButton.module.css';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import Pagination from '../Pagination/Pagination';

type Participant = {
  id: string;
  userId: string;
  username: string;
  email: string;
  twitterUsername: string;
  campaignName: string;
  lastLogin: string;
  selfPostCount: number;
  participationScore: number;
  shareScore: number;
  totalLikes: number;
  totalShares: number;
  likeScore: number;
  createdAt: string;
  blacklist: boolean;
};

const CampaignParticipants: React.FC = () => {
  const { id }: { id: string } = useParams();
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [participantId, setParticipantId] = useState('');
  const [blacklistLoading, setBlacklistLoading] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [filter, setFilter] = useState('');
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCampaignParticipants = async () => {
      filter ? setSearchLoading(true) : setIsLoading(true);
      const { data } = await axios.get(
        `${apiURI}/v1/participant/campaign-all-participants?skip=${skip}&take=${take}&campaignId=${id}&filter=${filter}`,
        {
          withCredentials: true,
        },
      );
      setParticipants(data.data.participants);
      setTotal(data.data.count);
      setIsLoading(false);
      setSearchLoading(false);
    };
    fetchCampaignParticipants();
  }, [id, filter, skip, reload]);

  // Blacklist a participant
  const blacklistParticpant = async (participantId: string) => {
    setParticipantId(participantId);
    setBlacklistLoading(true);
    await axios.put(`${apiURI}/v1/participant/blacklist/${participantId}`, {}, { withCredentials: true });
    setBlacklistLoading(false);
    setReload(true);
  };

  // Search field
  const handleSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    if (!e.target.value) {
      setFilter('');
    }
  };

  // Search record
  const handleSearchRecord = () => {
    setFilter(searchData);
  };

  // Handle Key Press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilter(searchData);
    }
  };

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  if (isLoading) {
    return (
      <div className={tableStyles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className={headingStyles.heading}>Participant List</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="search"
            value={searchData}
            className=" border-2 p-1 rounded w-72 h-10"
            placeholder="Search by username or email"
            onChange={handleSearchField}
            onKeyPress={handleKeyPress}
          />
          <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSearchRecord} loading={searchLoading}>
            Search
          </CustomButton>
        </div>
      </div>

      <div className={tableStyles.tableWrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.tableHeadRow}>
              <th className={tableStyles.tableColumn}>Username</th>
              <th className={tableStyles.tableColumn}>Email</th>
              <th className={tableStyles.tableColumn}>Twitter Username</th>
              <th className={tableStyles.tableColumn}>Campaign Name</th>
              <th className={tableStyles.tableColumn}>Post Count</th>
              <th className={tableStyles.tableColumn}>Like Score</th>
              <th className={tableStyles.tableColumn}>Share Score</th>
              <th className={tableStyles.tableColumn}>Participation Score</th>
              <th className={tableStyles.tableColumn}>Total Likes</th>
              <th className={tableStyles.tableColumn}>Total Shares</th>
              <th className={tableStyles.tableColumn}>Created At</th>
              <th className={tableStyles.tableColumn}>Last Login</th>
              <th className={tableStyles.tableColumn}>Action</th>
            </tr>
          </thead>
          <tbody>
            {!participants.length && <p className="p-2">No participant found for this campaign.</p>}
            {participants &&
              participants.map((participant: Participant) => (
                <tr className={tableStyles.tableBodyRow} key={participant.id}>
                  <td className={tableStyles.tableColumn}>{participant.username}</td>
                  <td className={tableStyles.tableColumn}>{participant.email}</td>
                  <td className={tableStyles.tableColumn}>{participant.twitterUsername}</td>
                  <td className={tableStyles.tableColumn}>{participant.campaignName}</td>
                  <td className={tableStyles.tableColumn}>{participant.selfPostCount}</td>
                  <td className={tableStyles.tableColumn}>{participant.likeScore}</td>
                  <td className={tableStyles.tableColumn}>{participant.shareScore}</td>
                  <td className={tableStyles.tableColumn}>{participant.participationScore}</td>
                  <td className={tableStyles.tableColumn}>{participant.totalLikes}</td>
                  <td className={tableStyles.tableColumn}>{participant.totalShares}</td>
                  <td className={tableStyles.tableColumn}>{new Date(participant.createdAt).toDateString()}</td>
                  <td className={tableStyles.tableColumn}>{new Date(participant.lastLogin).toDateString()}</td>
                  <td className={tableStyles.tableColumn}>
                    {!participant.blacklist && (
                      <CustomButton
                        className={buttonStyle.secondaryButton}
                        onClick={() => blacklistParticpant(participant.id)}
                        loading={blacklistLoading && participantId === participant.id}
                      >
                        Blacklist
                      </CustomButton>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {total > take && <Pagination total={total} skip={skip} take={take} getValue={getValue} />}
    </div>
  );
};

export default CampaignParticipants;
