import React, { useEffect, useReducer, useState } from 'react';
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
import PrimaryCard from './CryptoCard/PrimaryCard';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}
const triggerReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

export const CryptoList: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const { data: currencyData, loading } = useQuery<ListSupportedCryptoResults>(LIST_SUPPORTED_CRYPTO);
  const { data: currencyList } = useQuery<ListCurrenciesResult>(LIST_CURRENCIES, { fetchPolicy: 'network-only' });
  const [openCrypto, setOpenCrypto] = useState(false);
  const [openTokenRegistration, setOpenRegistration] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCurrency, dispatch] = useReducer(triggerReducer, {});

  useEffect(() => {
    if (!search) {
      dispatch({ type: 'CHANGE_SEARCH', payload: data?.getFundingWallet?.currency });
    } else {
      const filter = data?.getFundingWallet?.currency.filter((x: any) => {
        return x.type.toLowerCase().includes(search.toLowerCase());
      });
      dispatch({ type: 'CHANGE_SEARCH', payload: filter });
    }
  }, [search, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toolTipMap = {
    title: 'Currency Type',
    value: 'Balance',
  };
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
            <input
              type="text"
              name="search"
              value={search}
              className="border-2 p-1 rounded"
              placeholder="Search Currency"
              onChange={handleSearch}
            />
            <div className="flex gap-4 justify-between items-center">
              <CustomButton className="text-blue-800 w-16 p-1" onClick={() => setOpenCrypto(true)}>
                Deposit
              </CustomButton>
              <CustomButton className="text-blue-800 p-1" onClick={() => setOpenRegistration(true)}>
                <AddIcon />
              </CustomButton>
            </div>
          </div>
          {data && filterCurrency.currency ? (
            <div className="flex flex-wrap gap-4">
              {filterCurrency.currency.map((currency: any, index: number) => (
                <PrimaryCard
                  key={index}
                  title={currency.type}
                  value={currency.balance}
                  icon={currency.symbolImageUrl}
                  tooltipTitle={toolTipMap.title}
                  tooltipValue={toolTipMap.value}
                  id={currency.id}
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
