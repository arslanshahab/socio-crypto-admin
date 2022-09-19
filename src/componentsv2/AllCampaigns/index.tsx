import React, { FC, useEffect, useState } from 'react';
import RenderRow from '../RenderRow';
import styles from '../CampaignsTable/campaignsTable.module.css';
import { useDispatch } from 'react-redux';
import { Campaign } from '../../types';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';

const AllCampaigns: FC = () => {
  const dispatch = useDispatch();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    ApiClient.getCampaigns({ skip: 0, take: 1000, state: 'ALL', status: 'APPROVED' })
      .then((res) => {
        setCampaigns(res.items);
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
          {campaigns?.map((campaign: Campaign) => (
            <RenderRow key={campaign.id} campaign={campaign} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCampaigns;
