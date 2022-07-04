import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import tableStyles from '../../assets/styles/table.module.css';
import CustomButton from '../CustomButton';
import buttonStyle from '../../assets/styles/customButton.module.css';
import { CircularProgress } from '@material-ui/core';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import Pagination from '../Pagination/Pagination';

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
  blacklist: boolean;
};

const CampaignDetails: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { state }: { state: { campaignName: string } } = useLocation();
  const { push } = useHistory();
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

  useEffect(() => {
    const fetchCampaignParticipants = async () => {
      filter ? setSearchLoading(true) : setIsLoading(true);
      const { data } = await axios.get(
        `${apiURI}/v1/participant/campaign-all-participants?skip=${skip}&take=${take}&campaignId=${id}&filter=${filter}`,
        {
          withCredentials: true,
        },
      );
      setParticipants(data.data.items);
      setTotal(data.data.count);
      setIsLoading(false);
      setSearchLoading(false);
    };
    fetchCampaignParticipants();
  }, [id, filter, skip]);

  // Blacklist a participant
  const blacklistParticpant = async (participantId: string) => {
    setParticipantId(participantId);
    setBlacklistLoading(true);
    await axios.put(`${apiURI}/v1/participant/blacklist/${participantId}`, {}, { withCredentials: true });
    setBlacklistLoading(false);
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
      <div
        className="flex justify-start text-center cursor-pointer p-2 w-20"
        onClick={() => push('/dashboard/campaigns')}
      ></div>
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
            onKeyPress={handleKeyPress}
          />
          <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSearchRecord} loading={searchLoading}>
            Search
          </CustomButton>
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
              {!participants.length && <p className="p-2">No participant found for this campaign.</p>}
              {participants &&
                participants.map((participant: Participant) => (
                  <tr className={tableStyles.tableBodyRow} key={participant.id}>
                    <td className={tableStyles.tableColumn}>{participant.user.profile.username}</td>
                    <td className={tableStyles.tableColumn}>{participant.user.email}</td>
                    <td className={tableStyles.tableColumn}>{participant.participationScore}</td>
                    <td className={tableStyles.tableColumn}>{new Date(participant.createdAt).toDateString()}</td>
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
        <Pagination total={total} skip={skip} take={take} getValue={getValue} />
      </div>
    </div>
  );
};

export default CampaignDetails;
