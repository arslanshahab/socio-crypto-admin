import React, { useState } from 'react';
import { useQuery, ApolloQueryResult } from '@apollo/client';
import { ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
// import { AddressCard } from './AddressCard';
import AddIcon from '@material-ui/icons/Add';
import { AddEthAddress } from './AddEthAddress';
import styles from './admin/PendingWithdrawList/pendingWithdrawList.module.css';
import CustomButton from '../components/CustomButton';
import { CircularProgress } from '@material-ui/core';

export type RefetchExternalAddresses = (
  variables?: Partial<Record<string, any>> | undefined,
) => Promise<ApolloQueryResult<ListWalletResponse>>;

export const AddressList: React.FC = () => {
  const { loading, data, refetch } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES, {
    fetchPolicy: 'network-only',
  });
  const [addAddress, setAddAddress] = useState(false);
  // const renderUnclaimedAddresses = () => {
  //   const unclaimedAddresses: JSX.Element[] = [];
  //   if (loading) {
  //     return <div />;
  //   } else if (data && data.listExternalAddresses) {
  //     data.listExternalAddresses.map((address, index) => {
  //       if (!address.claimed) unclaimedAddresses.push(<AddressCard key={index} wallet={address} />);
  //     });
  //   }
  //   if (unclaimedAddresses.length === 0) {
  //     return (
  //       <Grid item className="list-item">
  //         <Typography component="div">Please register an address to claim</Typography>
  //       </Grid>
  //     );
  //   }
  //   return unclaimedAddresses;
  // };

  // const renderClaimedAddresses = () => {
  //   const claimedAddresses: JSX.Element[] = [];
  //   if (loading) {
  //     return <div />;
  //   } else if (data && data.listExternalAddresses) {
  //     data.listExternalAddresses.map((address, index) => {
  //       if (address.claimed) claimedAddresses.push(<AddressCard key={index} wallet={address} />);
  //     });
  //   }
  //   if (claimedAddresses.length === 0) {
  //     return (
  //       <Grid item className="list-item">
  //         <Typography component="div">Please claim an address</Typography>
  //       </Grid>
  //     );
  //   }
  //   return claimedAddresses;
  // };
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <AddEthAddress setOpen={setAddAddress} open={addAddress} refetchExternalAddresses={refetch} />
      <div className="flex justify-between items-center border-b-2 mb-6 w-full mt-2">
        <h1 className="text-center py-4 text-blue-800 text-3xl font-semibold">Claimed Addresses</h1>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.withdrawColumn}>Ethereum Address</th>
              <th className={styles.withdrawColumn}>Message</th>
              <th className={styles.withdrawColumn}>Claimed Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.listExternalAddresses?.map((x: any) => {
              if (x.claimed)
                return (
                  <tr className={styles.tableBodyRow} key={x.ethereumAddress}>
                    <td className={styles.withdrawColumn}>{x.ethereumAddress.toUpperCase()}</td>
                    <td className={styles.withdrawColumn}>{x.message}</td>
                    <td className={styles.withdrawColumn}>True</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      {/* <Grid item>{renderClaimedAddresses()}</Grid> */}
      {/* <Grid item container className="list-header" direction={'column'}>
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
      </Grid> */}
      <div className="flex justify-between items-center border-b-2 mb-6 w-full mt-2">
        <h1 className="text-center py-4 text-blue-800 text-3xl font-semibold">Unclaimed Addresses</h1>
        <CustomButton className="text-blue-800 p-1" onClick={() => setAddAddress(true)}>
          <AddIcon />
        </CustomButton>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.withdrawColumn}>Ethereum Address</th>
              <th className={styles.withdrawColumn}>Message</th>
              <th className={styles.withdrawColumn}>Claimed Status</th>
              <th className={styles.withdrawColumn}>Enable Web3</th>
            </tr>
          </thead>
          <tbody>
            {data?.listExternalAddresses?.map((x: any, index) => {
              if (!x.claimed)
                return (
                  <tr className={styles.tableBodyRow} key={x.ethereumAddress}>
                    <td className={styles.withdrawColumn}>{x.ethereumAddress.toUpperCase()}</td>
                    <td className={styles.withdrawColumn}>{x.message}</td>
                    <td className={styles.withdrawColumn}>False</td>
                    {/* <td className={styles.withdrawColumn}>
                      <AddressCard key={index} wallet={x} />
                    </td> */}
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      {/* <Grid item>{renderUnclaimedAddresses()}</Grid> */}
    </div>
  );
};
