import React from 'react';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client';
import { DELETE_CRYPTO_FROM_WALLET } from '../operations/mutations/crypto';
import { RefetchWallet } from './PaymentsAccount';
import { formatFloat } from '../helpers/formatter';
// import icons from 'base64-cryptocurrency-icons';

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

  const generateIcon = (type: string): string => {
    return icons[type]?.icon || icons['ETH']?.icon || '';
  };

  return (
    <Grid container item direction={'row'} className="list-row">
      <Grid item xs={4} className="list-item">
        <Box className="coinTitle" display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          {/* <img src={generateIcon(name)} alt="raiinmaker" className="coinIcon" /> */}
          <Typography>{name.toUpperCase()}</Typography>
        </Box>
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
