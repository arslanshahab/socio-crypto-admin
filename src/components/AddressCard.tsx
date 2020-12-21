import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ClaimEthereumAddress, Wallet } from '../types';
import { CLAIM_WALLET } from '../operations/mutations/ethereum';

interface Props {
  wallet: Wallet;
}

interface ClaimWalletVars {
  ethereumAddress: string;
  signature: string;
}

export const AddressCard: React.FC<Props> = ({ wallet }) => {
  const anyWindow = window as any;
  const [claimWallet, { error }] = useMutation<ClaimEthereumAddress, ClaimWalletVars>(CLAIM_WALLET);
  const [coinbase, setCoinbase] = useState(!!anyWindow.web3 && anyWindow.web3.eth.coinbase);
  const [web3Enabled, setWeb3Enabled] = useState(!!anyWindow.web3 && !!coinbase);
  if (anyWindow.web3) anyWindow.ethereum.on('accountsChanged', (a: any) => setCoinbase(a[0]));
  const web3 = async (message: string) => {
    anyWindow.web3.personal.sign(anyWindow.web3.fromUtf8(message), coinbase, (error: any, signature: string) => {
      if (error) return;
      claimWallet({ variables: { ethereumAddress: wallet.ethereumAddress, signature: signature } });
    });
  };
  const enableWeb3 = async () => {
    try {
      await anyWindow.ethereum.enable();
      setWeb3Enabled(true);
    } catch (e) {
      console.log('An error occurred conneting to web3. Please try again.');
    }
  };
  const renderWeb3 = (address: string, claimAmount: string) => {
    if (web3Enabled && coinbase && address && coinbase.toLowerCase() === address.toLowerCase()) {
      return (
        <Button size={'small'} color={'primary'} variant={'contained'} onClick={() => web3(claimAmount)}>
          <Typography component="div">Claim</Typography>
        </Button>
      );
    }
    if (web3Enabled) {
      return <Typography component="div">Select this address in metamask to claim</Typography>;
    }

    return (
      <Button size={'small'} color={'primary'} variant={'contained'} onClick={enableWeb3}>
        Enable web3/metamask to claim
      </Button>
    );
  };
  return (
    <Grid container item direction={'row'} justify={'center'} className="wallet-item">
      <Grid item xs={9}>
        <Typography component="div">{wallet && wallet.ethereumAddress}</Typography>
      </Grid>
      {!wallet.claimed && (
        <Grid item xs={3}>
          {renderWeb3(wallet.ethereumAddress, wallet.message)}
        </Grid>
      )}
    </Grid>
  );
};
