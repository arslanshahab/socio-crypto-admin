import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Tooltip } from '@material-ui/core';
import CustomSelect from '../../CustomSelect/CustomSelect';
import copy from 'copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '../../../store/actions/alerts';
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import headingStyles from '../../../assets/styles/heading.module.css';
import axios from 'axios';
import { apiURI } from '../../../clients/raiinmaker-api';

interface Props {
  cryptoList: { symbol: string; network: string }[] | undefined;
  callback?: () => void;
  fundingWallet: any;
}

type DepositAddressTypes = {
  symbol: string;
  address: string;
  fromTatum: boolean;
  memo?: string;
  message?: string;
  destinationTag?: string;
};

const DepositCryptoForm: React.FC<Props> = ({ cryptoList, callback, fundingWallet }) => {
  const [symbol, setSymbol] = useState('COIIN-BSC');
  const options = cryptoList?.map((item) => `${item.symbol}-${item.network}`) || [];
  const dispatch = useDispatch();
  const [depositAddress, setDepositAddress] = useState<DepositAddressTypes>();
  const [loading, setLoading] = useState(false);
  const [updatedCurrency, setUpdatedCurrency] = useState(false);

  // Fetch deposit address for symbol
  const fetchData = () => {
    setLoading(true);
    const filterSymbol = symbol.split('-')[0];
    const network = symbol.split('-')[1];
    axios
      .get(`${apiURI}/v1/tatum/deposit-address?symbol=${filterSymbol}&network=${network}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDepositAddress(res.data.data);
        setLoading(false);
        const found = fundingWallet?.find((item: any) => symbol === `${item.type}-${item.network}`);
        if (callback && ((fundingWallet.length && !found) || !fundingWallet.length)) callback();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchData, [updatedCurrency]);

  const copyAddress = () => {
    copy(depositAddress?.address || '');
    dispatch(showSuccessAlert('Address copied to Clipboard!'));
  };

  return (
    <Box className="p-10 w-full flex flex-col justify-center items-center">
      <h3 className={`${headingStyles.headingXl} mb-8`}>Deposit Crypto</h3>
      <Box className="w-4/6 box-border pr-4">
        <CustomSelect
          required={true}
          value={symbol}
          onChange={(event: React.ChangeEvent<any>) => {
            setSymbol(event.target.value), setUpdatedCurrency(!updatedCurrency);
          }}
          label="Select Token to Deposit"
          options={options}
          upperCaseOptions={true}
        />
      </Box>

      <Box className="w-full box-border pr-4 flex flex-col justify-center items-center">
        {depositAddress?.fromTatum ? (
          <p className="text-md text-center text-gray-800 mt-10">Please send selected token to this address:</p>
        ) : (
          <p className="text-md text-center text-gray-800 mt-10">
            Please send selected token from one of your claimed addresses to this address:
          </p>
        )}
        {loading || !depositAddress ? (
          <CircularProgress size={30} color="primary" className="mt-3" />
        ) : (
          <>
            {depositAddress?.memo && (
              <p className="text-md text-center text-gray-800 mt-5">Memo: {depositAddress.memo}</p>
            )}
            {depositAddress?.message && (
              <p className="text-md text-center text-gray-800 mt-5">Message: {depositAddress.message}</p>
            )}
            {depositAddress?.destinationTag && (
              <p className="text-md text-center text-gray-800 mt-5">DestinationTag: {depositAddress.destinationTag}</p>
            )}
            <Box className="flex flex-row justify-center items-center w-full text-md p-3 bg-gray-100 mt-2">
              <p className="w-5/6 overflow-ellipsis overflow-hidden text-center text-gray-800">
                {depositAddress?.address || ''}
              </p>
              <Tooltip title="Copy Address" placement="top">
                <span onClick={copyAddress}>
                  <ContentCopyIcon className="ml-2 cursor-pointer" />
                </span>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DepositCryptoForm;
