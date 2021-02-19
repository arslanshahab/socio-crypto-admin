import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ListSupportedCryptoResults } from '../types';
import { ADD_CRYPTO_TO_WALLET, REGISTER_CRYPTO } from '../operations/mutations/crypto';
import { capitalize } from '../helpers';
import { reloadWindow } from '../helpers/utils';
import { RefetchWallet } from './PaymentsAccount';

interface Props {
  isTokenRegistration: boolean;
  open: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ListSupportedCryptoResults;
  isLoading?: boolean;
  refectWallet: RefetchWallet;
}

export const CryptoDialog: React.FC<Props> = ({
  isTokenRegistration,
  open,
  setOpenDialog,
  data,
  isLoading,
  refectWallet,
}) => {
  const [addToken] = useMutation(ADD_CRYPTO_TO_WALLET);
  const [registerToken] = useMutation(REGISTER_CRYPTO);
  const [tokenName, setTokenName] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [openTokens, setOpenTokens] = useState(false);
  const handleRegisterToken = async (e: any) => {
    e.preventDefault();
    await registerToken({
      variables: { name: tokenName, contractAddress: contractAddress },
    });
    await refectWallet();
    setOpenDialog(false);
  };
  const handleAddToken = async () => {
    await addToken({
      variables: { contractAddress: contractAddress },
    });
    await refectWallet();
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
          <DialogTitle>Please provide token information</DialogTitle>
          <DialogContent>
            <Grid container direction={'column'} spacing={1}>
              <Grid item>
                <TextField className="text-input" label={'Token Name'} onChange={handleTokenChange} />
              </Grid>
              <Grid item>
                <TextField className="text-input" label={'Contract Address'} onChange={handleContractChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant={'contained'} color={'primary'} onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleRegisterToken}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open}>
          <DialogTitle>Select from the available tokens</DialogTitle>
          <DialogContent>
            <FormControl>
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
          <DialogActions>
            <Button variant={'contained'} color={'primary'} onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleAddToken}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
