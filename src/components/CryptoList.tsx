import React, { useState } from 'react';
import { CryptoItem } from './CryptoItem';
import { GetFundingWalletResponse, ListCurrenciesResult, ListSupportedCryptoResults } from '../types';
import { RefetchWallet } from './PaymentsAccount';
import { CryptoDialog } from './CryptoDialog';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/client';
import { LIST_CURRENCIES, LIST_SUPPORTED_CRYPTO } from '../operations/queries/crypto';
import GenericModal from './GenericModal';
import DepositCryptoForm from './Forms/DepositCryptoForm';
import CustomButton from '../components/CustomButton';
import { CircularProgress } from '@material-ui/core';
import circleStyles from './PendingCampaigns/pendingCampaigns.module.css';
import headingStyles from '../assets/styles/heading.module.css';
import commonStyles from '../assets/styles/common.module.css';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const CryptoList: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const { data: currencyData, loading } = useQuery<ListSupportedCryptoResults>(LIST_SUPPORTED_CRYPTO);
  const { data: currencyList } = useQuery<ListCurrenciesResult>(LIST_CURRENCIES, { fetchPolicy: 'network-only' });
  const [openCrypto, setOpenCrypto] = useState(false);
  const [openTokenRegistration, setOpenRegistration] = useState(false);

  return (
    <div className={commonStyles.sectionMinHeight}>
      {isLoading ? (
        <div className={circleStyles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <CryptoDialog
            isTokenRegistration={false}
            open={openTokenRegistration}
            setOpenDialog={setOpenRegistration}
            data={currencyData}
            isLoading={loading}
            refetchWallet={refetchWallet}
          />
          <GenericModal open={openCrypto} onClose={() => setOpenCrypto(false)} size="small">
            <DepositCryptoForm cryptoList={currencyList?.getSupportedCurrencies} />
          </GenericModal>
          <div className={headingStyles.paymentHeadingWrapper}>
            <h1 className={headingStyles.headingXl}>Crypto Currencies</h1>
            <div className="flex gap-4 justify-between items-center">
              <CustomButton className="text-blue-800 w-16 p-1" onClick={() => setOpenCrypto(true)}>
                Deposit
              </CustomButton>
              <CustomButton className="text-blue-800 p-1" onClick={() => setOpenRegistration(true)}>
                <AddIcon />
              </CustomButton>
            </div>
          </div>
          {data && data?.getFundingWallet?.currency ? (
            <div className="flex flex-wrap gap-4">
              {data?.getFundingWallet?.currency?.map((currency, index) => (
                <CryptoItem
                  key={index}
                  name={currency.type}
                  balance={currency.balance}
                  id={currency.id}
                  refetchWallet={refetchWallet}
                />
              ))}
            </div>
          ) : (
            <p>Please register or add a supported crypto currency</p>
          )}
        </div>
      )}
    </div>
  );
};
