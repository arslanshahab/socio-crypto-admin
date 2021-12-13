import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WITHDRAWAL_HISTORY } from '../../../operations/queries/admin';
import tableStyles from './../../BrandList/brandList.module.css';
import styles from './withdrawHistory.module.css';
import { CircularProgress } from '@material-ui/core';

export const WithdrawHistory: React.FC = () => {
  const { data, loading } = useQuery(GET_WITHDRAWAL_HISTORY, { fetchPolicy: 'network-only' });
  //! Loading
  if (loading) {
    return (
      <div className={tableStyles.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      <h2 className={tableStyles.heading}>Withdraw History</h2>
      {/* //!--------------------------------------------- */}
      <div className={tableStyles.tableWrapper}>
        <table className={tableStyles.table}>
          <thead>
            <tr className={tableStyles.tableHeadRow}>
              <th className={tableStyles.tableColumn}>Amount</th>
              <th className={tableStyles.tableColumn}>Action</th>
              <th className={tableStyles.tableColumn}>Withdraw Status</th>
              <th className={tableStyles.tableColumn}>Paypal Address</th>
              <th className={tableStyles.tableColumn}>Active Since</th>
            </tr>
          </thead>
          <tbody>
            {data?.getWithdrawalHistory.length === 0 ? (
              <div className={styles.notFoundCheck}>There is no history found</div>
            ) : (
              <>
                {data.getWithdrawalHistory.map(
                  (withdraw: {
                    id: string;
                    amount: number;
                    action: string;
                    withdrawStatus: string;
                    ethAddress: string;
                    paypalAddress: string;
                    createdAt: string;
                  }) => (
                    <tr className={tableStyles.tableBodyRow} key={withdraw.id}>
                      <td className={tableStyles.tableColumn}>{withdraw.amount.toFixed(2)}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.action}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.withdrawStatus}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.ethAddress}</td>
                      <td className={tableStyles.tableColumn}>{withdraw.paypalAddress}</td>
                      <td className={tableStyles.tableColumn}>
                        {new Date(parseInt(withdraw.createdAt)).toLocaleString()}
                      </td>
                    </tr>
                  ),
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* //!--------------------------------------------- */}
      {/* {data?.getWithdrawalHistory?.map((transfer: any) => {
        const isCoiinTransfer = transfer.ethAddress != null;
        return (
          <div className="withdraw-contianer" key={transfer.id}>
            <div className="withdraw-item flex-reverse">
              <p className="amount paddin-right">{`${
                isCoiinTransfer ? transfer.amount + ' COIIN' : transfer.amount * 0.1 + ' USD'
              } `}</p>
            </div>
            <div className="withdraw-item flex-reverse">
              <p className="amount paddin-right">{`${transfer.withdrawStatus}`}</p>
            </div>
            <div className="withdraw-item flex-reverse">
              <p className="date padding-right">{`${new Date(parseInt(transfer.createdAt)).toLocaleDateString()}`}</p>
              <p className="date padding-right">{`${new Date(parseInt(transfer.createdAt)).toLocaleTimeString()}`}</p>
              <p className="date padding-right right">{`UTC`}</p>
            </div>
            <div className="address-container">
              <p className="amount right">{`${isCoiinTransfer ? transfer.ethAddress : transfer.paypalAddress} `}</p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};
