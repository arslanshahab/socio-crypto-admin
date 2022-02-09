import React, { useState } from 'react';
import { Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ListSupportedCryptoResults } from '../types';
import { ADD_CRYPTO_TO_WALLET, REGISTER_CRYPTO } from '../operations/mutations/crypto';
import { capitalize } from '../helpers/formatter';
import { RefetchWallet } from './PaymentsAccount';
import { toast } from 'react-toastify';
import headingStyles from '../assets/styles/heading.module.css';
import CustomButton from './CustomButton';
import buttonStyles from '../assets/styles/customButton.module.css';

interface Props {
  isTokenRegistration: boolean;
  open: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ListSupportedCryptoResults;
  isLoading?: boolean;
  refetchWallet: RefetchWallet;
}

export const CryptoDialog: React.FC<Props> = ({
  isTokenRegistration,
  open,
  setOpenDialog,
  data,
  isLoading,
  refetchWallet,
}) => {
  const [addToken] = useMutation(ADD_CRYPTO_TO_WALLET);
  const [registerToken] = useMutation(REGISTER_CRYPTO);
  const [tokenName, setTokenName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [openTokens, setOpenTokens] = useState(false);
  const handleRegisterToken = async (e: any) => {
    e.preventDefault();
    try {
      await registerToken({
        variables: { name: tokenName, contractAddress: contractAddress },
      });
      await refetchWallet();
    } catch (e) {
      console.log(e);
      toast.error('Token already registered', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setOpenDialog(false);
  };
  const handleAddToken = async () => {
    try {
      await addToken({
        variables: { contractAddress: contractAddress },
      });
      await refetchWallet();
    } catch (e) {
      console.log('e');
      console.log(e);
    }
    setOpenDialog(false);
  };
  const handleTokenChange = (e: any) => {
    setTokenName(e.target.value);
  };
  const handleContractChange = (e: any) => {
    setContractAddress(e.target.value);
  };
  return (
    <div>
      {isTokenRegistration ? (
        <Dialog open={open}>
          <h2 className={headingStyles.headingXl}>Please Provide Token Information</h2>
          <DialogContent style={{ width: '600px', padding: '24px' }}>
            <div className="flex flex-col">
              <TextField
                className="text-input"
                label={'Token Name'}
                style={{ marginBottom: '24px' }}
                onChange={handleTokenChange}
              />
              <TextField className="text-input" label={'Contract Address'} onChange={handleContractChange} />
            </div>
          </DialogContent>
          <div className="flex gap-4 justify-center my-4">
            <CustomButton className={buttonStyles.buttonPrimary} type={'submit'} onClick={handleRegisterToken}>
              Submit
            </CustomButton>
            <CustomButton className={buttonStyles.buttonPrimary} onClick={() => setOpenDialog(false)}>
              Cancel
            </CustomButton>
          </div>
        </Dialog>
      ) : (
        <Dialog open={open}>
          <h2 className={headingStyles.headingXl}>Select From the Ailable Tokens</h2>
          <DialogContent style={{ width: '600px' }}>
            <FormControl className="w-full">
              <InputLabel>Crypto Currencies</InputLabel>
              {isLoading ? (
                <div />
              ) : (
                <Select
                  open={openTokens}
                  native={false}
                  className="form-control-item"
                  onClose={() => setOpenTokens(false)}
                  onOpen={() => setOpenTokens(true)}
                  renderValue={() => tokenName.toUpperCase()}
                >
                  {data &&
                    data.listSupportedCrypto.map((crypto, index) => {
                      return (
                        <MenuItem
                          value={crypto.type}
                          onClick={() => {
                            setTokenName(crypto.type);
                            setContractAddress(crypto.contractAddress);
                          }}
                          key={index}
                        >
                          {crypto.contractAddress
                            ? `${capitalize(crypto.type.toUpperCase())}  (${crypto.contractAddress})`
                            : capitalize(crypto.type.toUpperCase())}
                        </MenuItem>
                      );
                    })}
                </Select>
              )}
            </FormControl>
          </DialogContent>
          <div className="flex gap-4 justify-center mt-8 mb-4">
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleAddToken}>
              Submit
            </CustomButton>
            <CustomButton className={buttonStyles.buttonPrimary} onClick={() => setOpenDialog(false)}>
              Cancel
            </CustomButton>
          </div>
        </Dialog>
      )}
    </div>
  );
};
