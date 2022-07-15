import React, { useEffect, useState } from 'react';
import { GetFundingWalletResponse } from '../types';
import { CircularProgress } from '@material-ui/core';
import { RefetchWallet } from './PaymentsAccount';
import { capitalize } from '../helpers/formatter';
import styles from './admin/PendingWithdrawList/pendingWithdrawList.module.css';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';

interface Props {
  fundingWallet: GetFundingWalletResponse | undefined;
  refetchWallet: RefetchWallet;
}

export const CampaignStatusList: React.FC<Props> = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/campaign?skip=0&take=1000&state=ALL&status=APPROVED`, {
        withCredentials: true,
      });
      setCampaigns(data.data.items);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.withdrawColumn}>Campaigns</th>
              <th className={styles.withdrawColumn}>Status</th>
              <th className={styles.withdrawColumn}>Currency</th>
              <th className={styles.withdrawColumn}>Budget</th>
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((campaign: any, index) => {
              return (
                <tr className={styles.tableBodyRow} key={index}>
                  <td className={styles.withdrawColumn}>{campaign.name}</td>
                  <td className={styles.withdrawColumn}>{campaign.status}</td>
                  <td className={styles.withdrawColumn}>
                    {(campaign.crypto && capitalize(campaign.crypto.type)) || 'Coiin'}
                  </td>
                  <td className={styles.withdrawColumn}>{campaign.coiinTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
