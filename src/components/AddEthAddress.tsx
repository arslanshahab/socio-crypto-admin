import React, { ChangeEvent, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ClaimEthereumAddress } from '../types';
import { ATTACH_WALLET } from '../operations/mutations/ethereum';
import { RefetchExternalAddresses } from './AddressList';
import headingStyles from '../assets/styles/heading.module.css';
import buttonStyles from '../assets/styles/customButton.module.css';
import CustomButton from './CustomButton';

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
      <h2 className={headingStyles.headingXl}>Add ETH Address</h2>
      <DialogContent style={{ width: '600px' }}>
        <form onSubmit={handleAttachWallet}>
          <div className="mb-8 w-full">
            <TextField
              fullWidth
              margin={'dense'}
              type={'text'}
              name={'address'}
              onChange={handleChange}
              label="ETH Address"
            />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <CustomButton className={buttonStyles.buttonPrimary} type={'submit'}>
              Submit
            </CustomButton>
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleClose}>
              Cancel
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
