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

export const WalletCard: React.FC<Props> = ({ wallet }) => {
  const anyWindow = window as any;
  const [claimWallet, { error }] = useMutation<ClaimEthereumAddress, ClaimWalletVars>(CLAIM_WALLET);
  const [coinbase, setCoinbase] = useState(!!anyWindow.web3 && anyWindow.web3.eth.coinbase);
  const [web3Enabled, setWeb3Enabled] = useState(!!anyWindow.web3 && !!coinbase);
  if (anyWindow.web3) anyWindow.ethereum.on('accountsChanged', (a: any) => setCoinbase(a[0]));
  const isClaimed = () => {
    return <Typography>{wallet.claimed ? 'Yes' : 'No'}</Typography>;
  };
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
        <Button onClick={() => web3(claimAmount)}>
          <Typography>Claim Address via MetaMask</Typography>
        </Button>
      );
    }
    if (web3Enabled) {
      return <Typography>Select this address in metamask to claim</Typography>;
    }

    return <Button onClick={enableWeb3}>Enable web3/metamask to claim</Button>;
  };
  return (
    <div>
      <Grid container direction={'row'}>
        <Grid item xs={7}>
          <Typography>{wallet && wallet.ethereumAddress}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{wallet && wallet.balance}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>{isClaimed()}</Typography>
        </Grid>
        {!wallet.claimed && <Grid item>{renderWeb3(wallet.ethereumAddress, wallet.message)}</Grid>}
      </Grid>
    </div>
  );
};
