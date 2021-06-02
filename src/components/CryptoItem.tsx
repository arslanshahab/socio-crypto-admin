import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { DELETE_CRYPTO_FROM_WALLET } from '../operations/mutations/crypto';
import { RefetchWallet } from './PaymentsAccount';
import { formatFloat } from '../helpers/formatter';

interface Props {
  id: string;
  name: string;
  balance: number;
  refetchWallet: RefetchWallet;
}

export const CryptoItem: React.FC<Props> = ({ name, balance, id, refetchWallet }) => {
  const [removeCurrency] = useMutation(DELETE_CRYPTO_FROM_WALLET, { errorPolicy: 'all' });
  const handleDelete = async (event: any) => {
    event.preventDefault();
    await removeCurrency({ variables: { id } });
    await refetchWallet();
  };
  return (
    <Grid container item direction={'row'} className="list-row">
      <Grid item xs={4} className="list-item">
        <Typography>{name.toUpperCase()}</Typography>
      </Grid>
      <Grid item className="list-item">
        <Typography>{formatFloat(balance, 8)}</Typography>
      </Grid>
      <Grid item xs />
      <Grid item className="list-button-container">
        <Button onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
