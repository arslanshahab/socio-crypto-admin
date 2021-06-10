import React, { ChangeEvent, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ClaimEthereumAddress } from '../types';
import { ATTACH_WALLET } from '../operations/mutations/ethereum';
import { RefetchExternalAddresses } from './AddressList';

interface AttachWallet {
  ethereumAddress: string;
}
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  refetchExternalAddresses: RefetchExternalAddresses;
}

export const AddEthAddress: React.FC<Props> = ({ setOpen, open, refetchExternalAddresses }) => {
  const [attachWallet] = useMutation<ClaimEthereumAddress, AttachWallet>(ATTACH_WALLET);
  const [address, setAddress] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleAttachWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await attachWallet({ variables: { ethereumAddress: address } });
      handleClose();
      refetchExternalAddresses();
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    setAddress(e.target.value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add ETH Address</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAttachWallet}>
          <Grid container justify={'center'} direction={'column'}>
            <Grid item>
              <TextField
                style={{ width: '375px' }}
                fullWidth
                margin={'dense'}
                type={'text'}
                name={'address'}
                onChange={handleChange}
                label="ETH Address"
              />
            </Grid>
            <Grid container item justify={'center'} spacing={2} style={{ marginTop: '25px' }}>
              <Grid item>
                <Button variant={'contained'} color={'primary'} type={'submit'}>
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant={'contained'} color={'primary'} onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
