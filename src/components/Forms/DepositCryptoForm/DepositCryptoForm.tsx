import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import CustomSelect from '../../CustomSelect/CustomSelect';
import { DepositAddressResult, ListSupportedCryptoResults } from '../../../types.d';
import { useQuery } from '@apollo/client';
import { GET_DEPOSIT_ADDRESS } from '../../../operations/queries/crypto';

interface Props {
  cryptoList: ListSupportedCryptoResults | undefined;
}

const DepositCryptoForm: React.FC<Props> = ({ cryptoList }) => {
  const [currency, setCurrency] = useState('coiin');
  const cryptoOptions = cryptoList ? cryptoList.listSupportedCrypto.map((item) => item.type.toUpperCase()) : [];
  cryptoOptions.push('BTC');
  const { data, loading, refetch } = useQuery<DepositAddressResult>(GET_DEPOSIT_ADDRESS, {
    variables: { currency: currency },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    refetch({ variables: { currency: currency } });
  }, [currency]);

  return (
    <Box className="p-10 w-full flex flex-col justify-center items-center">
      <h3 className="text-2xl text-center text-gray-800 mb-10">Deposit Crypto</h3>
      <Box className="w-4/6 box-border pr-4">
        <CustomSelect
          required={true}
          value={currency}
          onChange={(event: React.ChangeEvent<any>) => setCurrency(event.target.value)}
          label="Select Token to Deposit"
          options={cryptoOptions}
          upperCaseOptions={true}
        />
      </Box>

      <Box className="w-full box-border pr-4 flex flex-col justify-center items-center">
        <p className="text-md text-center text-gray-800 mt-10">
          Please send selected token from one of your claimed addresses to this address:
        </p>
        {loading ? (
          <CircularProgress size={30} color="primary" className="mt-3" />
        ) : (
          <p className="text-md p-3 text-center text-gray-800 bg-gray-100 mt-2">
            {data?.getDepositAddressForCurrency?.address || ''}
          </p>
        )}
      </Box>
    </Box>
  );
};

export default DepositCryptoForm;
