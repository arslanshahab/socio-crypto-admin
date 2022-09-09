import React, { FC, useEffect, useState } from 'react';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import { Campaign } from '../../types';
import styles from './campaignsTable.module.css';
import { useDispatch } from 'react-redux';

const CampaignsTable: FC = () => {
  const dispatch = useDispatch();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    ApiClient.getCampaigns({ skip: 0, take: 10, state: 'OPEN', status: 'APPROVED' })
      .then((res) => {
        setCampaigns(res);
      })
      .catch((err) => dispatch(showErrorAlert((err as Error).message)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Status</th>
            <th>Participation Score</th>
            <th>Users</th>
            <th>Conversion Actions</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length &&
            campaigns.map((campaign: Campaign) => (
              <tr key={campaign.name}>
                <td>{campaign.name}</td>
                <td className={styles.successStatus}>&uarr;</td>
                <td>{campaign.totalParticipationScore}</td>
                <td>{campaign.participant.length}</td>
                <td>505,262</td>
                <td>
                  <progress id="file" value="70" max="100" className={styles.progress} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsTable;
