import React from 'react';
import { useQuery } from '@apollo/client';
import { ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { Grid } from '@material-ui/core';
import { AddressCard } from './AddressCard';

export const EthereumAddressList: React.FC = () => {
  const { loading, data } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES);

  return (
    <Grid container direction={'column'}>
      {loading ? (
        <div />
      ) : (
        <div>
          {data &&
            data.listExternalAddresses.map((wallet, index) => {
              return <AddressCard key={index} wallet={wallet} />;
            })}
        </div>
      )}
    </Grid>
  );
};
