import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { AddressCard } from './AddressCard';
import AddIcon from '@material-ui/icons/Add';
import { AddEthAddress } from './AddEthAddress';

export const AddressList: React.FC = () => {
  const { loading, data } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES);
  const [addAddress, setAddAddress] = useState(false);

  const renderUnclaimedAddresses = () => {
    const unclaimedAddresses: JSX.Element[] = [];
    if (loading) {
      return <div />;
    } else if (data && data.listExternalAddresses) {
      data.listExternalAddresses.map((address, index) => {
        if (!address.claimed) unclaimedAddresses.push(<AddressCard key={index} wallet={address} />);
      });
    }
    if (unclaimedAddresses.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">Please register an address to claim</Typography>
        </Grid>
      );
    }
    return unclaimedAddresses;
  };

  const renderClaimedAddresses = () => {
    const claimedAddresses: JSX.Element[] = [];
    if (loading) {
      return <div />;
    } else if (data && data.listExternalAddresses) {
      data.listExternalAddresses.map((address, index) => {
        if (address.claimed) claimedAddresses.push(<AddressCard key={index} wallet={address} />);
      });
    }
    if (claimedAddresses.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">Please claim an address</Typography>
        </Grid>
      );
    }
    return claimedAddresses;
  };

  return (
    <div>
      <AddEthAddress setOpen={setAddAddress} open={addAddress} />
      <Grid item container className="list-header" direction={'column'}>
        <Grid item>
          <Typography component={'div'} variant={'h5'}>
            Claimed Addresses
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>Address</Typography>
        </Grid>
      </Grid>
      <Grid item>{renderClaimedAddresses()}</Grid>
      <Grid item container className="list-header" direction={'column'}>
        <Grid item container>
          <Grid item>
            <Typography component={'div'} variant={'h5'}>
              Unclaimed Addresses
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button color={'primary'} onClick={() => setAddAddress(true)}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Typography>Address</Typography>
        </Grid>
      </Grid>
      <Grid item>{renderUnclaimedAddresses()}</Grid>
    </div>
  );
};
