import React, { useEffect, useState } from 'react';
import tableStyles from './../../BrandList/brandList.module.css';
import styles from './withdrawHistory.module.css';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { apiURI } from '../../../clients/raiinmaker-api';

export const WithdrawHistory: React.FC = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/withdraw/history`, { withCredentials: true });
      setWithdraws(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //! Loading
  if (isLoading) {
    return (
      <div className={tableStyles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h2 className={tableStyles.heading}>Withdraw History</h2>
      <div className={tableStyles.tableWrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.tableHeadRow}>
              <th className={tableStyles.tableColumn}>Amount</th>
              <th className={tableStyles.tableColumn}>Action</th>
              <th className={tableStyles.tableColumn}>Status</th>
              <th className={tableStyles.tableColumn}>Eth Address</th>
              <th className={tableStyles.tableColumn}>Active Since</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.length <= 0 ? (
              <div className={styles.notFoundCheck}>There is no history found</div>
            ) : (
              <>
                {withdraws.map(
                  (withdraw: {
                    id: string;
                    amount: number;
                    action: string;
                    status: string;
                    ethAddress: string;
                    paypalAddress: string;
                    createdAt: string;
                  }) => (
                    <tr className={tableStyles.tableBodyRow} key={withdraw.id}>
                      <td className={tableStyles.tableColumn}>{withdraw.amount}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.action}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.status}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.ethAddress}</td>
                      <td className={tableStyles.tableColumn}>{new Date(withdraw.createdAt).toLocaleString()}</td>
                    </tr>
                  ),
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
