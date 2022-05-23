import { CircularProgress } from '@material-ui/core';
import React, { FC } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import { CurrencyTypes } from '../../rest-types';

const UserTransferRecord: FC<any> = ({ transferUserRecord }) => {
  return (
    <div className={styles.transferSide}>
      <h3 className={headingStyles.headingSm}>Transfer User Record</h3>
      <div className={styles.coiinWrapper}>
        <h4 className={headingStyles.headingXs}>Coiin Amount:</h4>
        {transferUserRecord && transferUserRecord?.length === 0 ? <p>No transfer record found</p> : ''}
        {transferUserRecord ? (
          transferUserRecord?.map((x: CurrencyTypes) => (
            <div key={x.imageUrl} className={styles.boxWrapper}>
              <div className={styles.boxStyle}>
                <h4>Balance:</h4>
                <p>{x.balance}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Minimum Withdraw Amount:</h4>
                <p>{x.minWithdrawAmount}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>USD Balance:</h4>
                <p>{x.usdBalance}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Symbol:</h4>
                <p>{x.symbol}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Network:</h4>
                <p>{x.network}</p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTransferRecord;
