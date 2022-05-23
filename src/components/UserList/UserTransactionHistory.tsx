import React, { FC } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';

const UserTransactionHistory: FC<any> = ({ transactionHistory }) => {
  console.log('transactionHistory:---------------------- ', transactionHistory);

  return (
    <div>
      <h3 className={headingStyles.headingSm}>Transfer User Record</h3>
    </div>
  );
};

export default UserTransactionHistory;
