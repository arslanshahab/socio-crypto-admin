import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
// import { useMutation } from '@apollo/client';
// import { DELETE_CRYPTO_FROM_WALLET } from '../operations/mutations/crypto';
import { RefetchWallet } from './PaymentsAccount';
import { formatFloat } from '../helpers/formatter';
import cardStyles from './StatCard/statCard.module.css';
import { Tooltip } from '@material-ui/core';

// eslint-disable-next-line
// @ts-ignore
import getImage from 'cryptoicons-cdn';

interface Props {
  id: string;
  name: string;
  balance: number;
  refetchWallet: RefetchWallet;
}

export const CryptoItem: React.FC<Props> = ({ name, balance, id, refetchWallet }) => {
  // const [removeCurrency] = useMutation(DELETE_CRYPTO_FROM_WALLET, { errorPolicy: 'all' });
  // const handleDelete = async (event: any) => {
  //   event.preventDefault();
  //   await removeCurrency({ variables: { id } });
  //   await refetchWallet();
  // };

  const generateIcon = (type: string): string => {
    return getImage(type).toLowerCase().includes('unknown') ? getImage('ETH') : getImage(type);
  };

  return (
    <div key={id}>
      <div className={cardStyles.statCardWrapper}>
        <div className={cardStyles.analyticsNumberIcon}>
          <Tooltip title="Coin Type" placement="top-start">
            <p className={cardStyles.analyticsName}>{name.toUpperCase()}</p>
          </Tooltip>
          <img src={generateIcon(name)} alt="raiinmaker" className="coinIcon" />
        </div>
        <div className={cardStyles.analyticsNumberIcon}>
          <Tooltip title="Balance" placement="top-start">
            <h2 className={cardStyles.analyticsNumber}>{formatFloat(balance)}</h2>
          </Tooltip>
          <Tooltip title="Delete Coin" placement="top-start">
            <DeleteIcon className="text-red-500 mr-1.5" fontSize="small" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
