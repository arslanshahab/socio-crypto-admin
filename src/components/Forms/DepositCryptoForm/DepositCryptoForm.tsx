import React, { useState } from 'react';
import { Box, CircularProgress, Tooltip } from '@material-ui/core';
import CustomSelect from '../../CustomSelect/CustomSelect';
import { DepositAddressResult } from '../../../types.d';
import { useQuery } from '@apollo/client';
import { GET_DEPOSIT_ADDRESS } from '../../../operations/queries/crypto';
import copy from 'copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '../../../store/actions/alerts';
import ContentCopyIcon from '@material-ui/icons/FileCopy';

interface Props {
  cryptoList: string[] | undefined;
}

const DepositCryptoForm: React.FC<Props> = ({ cryptoList }) => {
  const [symbol, setSymbol] = useState('COIIN');
  const dispatch = useDispatch();
  const { data, loading } = useQuery<DepositAddressResult>(GET_DEPOSIT_ADDRESS, {
    variables: { symbol },
    fetchPolicy: 'network-only',
  });

  const copyAddress = () => {
    copy(data?.getDepositAddressForSymbol?.address || '');
    dispatch(showSuccessAlert('Address copied to Clipboard!'));
  };

  return (
    <Box className="p-10 w-full flex flex-col justify-center items-center">
      <h3 className="text-2xl text-center text-gray-800 mb-10">Deposit Crypto</h3>
      <Box className="w-4/6 box-border pr-4">
        <CustomSelect
          required={true}
          value={symbol}
          onChange={(event: React.ChangeEvent<any>) => setSymbol(event.target.value)}
          label="Select Token to Deposit"
          options={cryptoList || []}
          upperCaseOptions={true}
        />
      </Box>

      <Box className="w-full box-border pr-4 flex flex-col justify-center items-center">
        {data?.getDepositAddressForSymbol.fromTatum ? (
          <p className="text-md text-center text-gray-800 mt-10">Please send selected token to this address:</p>
        ) : (
          <p className="text-md text-center text-gray-800 mt-10">
            Please send selected token from one of your claimed addresses to this address:
          </p>
        )}
        {loading ? (
          <CircularProgress size={30} color="primary" className="mt-3" />
        ) : (
          <>
            {data?.getDepositAddressForSymbol.memo && (
              <p className="text-md text-center text-gray-800 mt-5">Memo: {data.getDepositAddressForSymbol.memo}</p>
            )}
            {data?.getDepositAddressForSymbol.message && (
              <p className="text-md text-center text-gray-800 mt-5">
                Message: {data.getDepositAddressForSymbol.message}
              </p>
            )}
            {data?.getDepositAddressForSymbol.destinationTag && (
              <p className="text-md text-center text-gray-800 mt-5">
                DestinationTag: {data.getDepositAddressForSymbol.destinationTag}
              </p>
            )}
            <Box className="flex flex-row justify-center items-center w-full text-md p-3 bg-gray-100 mt-2">
              <p className="w-5/6 overflow-ellipsis overflow-hidden text-center text-gray-800">
                {data?.getDepositAddressForSymbol?.address || ''}
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
