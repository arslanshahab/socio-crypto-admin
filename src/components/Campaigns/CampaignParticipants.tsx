import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    const fetchCampaignParticipants = async () => {
      filter ? setSearchLoading(true) : setIsLoading(true);
      const { data } = await axios.get(
        `${apiURI}/v1/participant/all?skip=${skip}&take=${take}&campaignId=${id}&filter=${filter}&sort=${sort}`,
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
  }, [id, filter, skip, reload, sort]);

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

  // Handle sort
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'desc') setSort('desc');
    if (e.target.value === 'asc') setSort('asc');
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className={headingStyles.heading}>Participant List</h2>
        <div className="flex gap-4">
          <div className="flex gap-4 items-center text-gray-500 text-sm">
            <p>Sort by Participation Score</p>
            <div className="inset-y-0 right-0 flex items-center">
              <select
                name="sorting"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                onChange={handleSort}
              >
                <option value={'desc'}>DESC</option>
                <option value={'asc'}>ASC</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            name="search"
            value={searchData}
            className=" border-2 p-1 rounded w-72 h-10"
            placeholder="Search by username or email"
            onChange={handleSearchField}
            onKeyPress={handleKeyPress}
          />
          <CustomButton className={buttonStyles.buttonPrimary} loading={searchLoading}>
            Search
          </CustomButton>
        </div>
      </div>
      {isLoading ? (
        <div className={tableStyles.tableBodyLoading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={tableStyles.tableWrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.tableHeadRow}>
                <th className={tableStyles.tableColumn}>Username</th>
                <th className={tableStyles.tableColumn}>Email</th>
                <th className={tableStyles.tableColumn}>Post Count</th>
                <th className={tableStyles.tableColumn}>Like Score</th>
                <th className={tableStyles.tableColumn}>Share Score</th>
                <th className={`${tableStyles.tableColumn} cursor-pointer`}>Participation Score</th>
                <th className={tableStyles.tableColumn}>Total Likes</th>
                <th className={tableStyles.tableColumn}>Total Shares</th>
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
                    <td className={tableStyles.tableColumn}>{participant.selfPostCount}</td>
                    <td className={tableStyles.tableColumn}>{participant.likeScore}</td>
                    <td className={tableStyles.tableColumn}>{participant.shareScore}</td>
                    <td className={tableStyles.tableColumn}>{participant.participationScore}</td>
                    <td className={tableStyles.tableColumn}>{participant.totalLikes}</td>
                    <td className={tableStyles.tableColumn}>{participant.totalShares}</td>
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
      )}

      {total > take && <Pagination total={total} skip={skip} take={take} getValue={getValue} />}
    </div>
  );
};

export default CampaignParticipants;
