import React, { ChangeEvent, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { WalletCard } from './WalletCard';
import { useMutation, useQuery } from '@apollo/client';
import { ClaimEthereumAddress, ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { ATTACH_WALLET } from '../operations/mutations/ethereum';

interface AttachWallet {
  ethereumAddress: string;
}

export const PaymentsAccount: React.FC = () => {
  const [address, setAddress] = useState('');
  const { loading, data } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES);
  const [attachWallet, { error }] = useMutation<ClaimEthereumAddress, AttachWallet>(ATTACH_WALLET);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    setAddress(e.target.value);
  };
  const handleAttachWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ADDRESS', address);
    const response = await attachWallet({ variables: { ethereumAddress: address } });
    console.log(response);
  };

  return (
    <div>
      <Paper className="payments-account">
        <Grid container direction={'column'} justify={'center'} spacing={2}>
          <Grid item>
            <Grid item>
              <Typography variant={'h4'}>Payments Account</Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <PaymentIcon />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction={'column'} spacing={2}>
                <Typography>How you pay</Typography>
                <Typography>Coiin</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography>To manage other forms of payments, please contact your account manager.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container direction={'column'}>
        <Paper className="ethereum-address-list-header">
          <Grid container>
            <Grid item xs={7}>
              <Typography>Ethereum Addresses</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Balance</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>Claimed</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="ethereum-address-paper">
          {loading ? (
            <p>loading...</p>
          ) : (
            <div>
              {data && console.log('DATA: ', data)}
              {data &&
                data.listExternalAddresses.map((wallet, index) => {
                  return <WalletCard key={index} wallet={wallet} />;
                })}
            </div>
          )}
          <form onSubmit={handleAttachWallet}>
            <div style={{ marginTop: '150px' }}>
              <TextField
                style={{ width: '450px' }}
                type={'text'}
                name={'address'}
                onChange={handleChange}
                id="outlined-basic"
                label="New Address"
                variant="outlined"
              />
              <div style={{ marginTop: '10px' }}>
                <Button variant={'contained'} color={'primary'} type={'submit'}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};
