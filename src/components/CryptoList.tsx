import React, { useEffect, useReducer, useState } from 'react';
import { CryptoDialog } from './CryptoDialog';
import GenericModal from './GenericModal';
import DepositCryptoForm from './Forms/DepositCryptoForm';
import CustomButton from '../components/CustomButton';
import { CircularProgress } from '@material-ui/core';
import circleStyles from './PendingCampaigns/pendingCampaigns.module.css';
import headingStyles from '../assets/styles/heading.module.css';
import commonStyles from '../assets/styles/common.module.css';
import PrimaryCard from './CryptoCard/PrimaryCard';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';

const triggerReducer = (
  state: any,
  action: {
    type: string;
    payload: { type: string; symbolImageUrl: string; balance: number; id: string }[] | undefined;
  },
) => {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

export const CryptoList: React.FC = () => {
  const [openCrypto, setOpenCrypto] = useState(false);
  const [openTokenRegistration, setOpenRegistration] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCurrency, dispatch] = useReducer(triggerReducer, []);
  const [fundingWallet, setFundingWallet] = useState([]);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [supportedCryptoList, setSupportedCryptoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsWalletLoading(true);
      const { data } = await axios(`${apiURI}/v1/funding-wallet`, { withCredentials: true });
      setFundingWallet(data.data);
      setIsWalletLoading(false);
    };
    fetchData();
  }, [refetch]);

  // Fetch currency list
  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios(`${apiURI}/v1/tatum/supported-currencies`, { withCredentials: true });
        setCurrencyList(data.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch supported crypto list
  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const { data } = await axios(`${apiURI}/v1/crypto/supported-crypto`, { withCredentials: true });
        setSupportedCryptoList(data.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!search) {
      dispatch({ type: 'CHANGE_SEARCH', payload: fundingWallet });
    } else {
      const filter = fundingWallet.filter((x: any) => {
        return x.type.toLowerCase().includes(search.toLowerCase());
      });
      dispatch({ type: 'CHANGE_SEARCH', payload: filter });
    }
  }, [search, fundingWallet]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRefetch = () => {
    setRefetch(new Date().getTime());
  };

  const toolTipMap = {
    title: 'Token',
    value: 'Balance',
    network: 'Network',
  };
  return (
    <div className={commonStyles.sectionMinHeight}>
      <CryptoDialog
        isTokenRegistration={false}
        open={openTokenRegistration}
        setOpenDialog={setOpenRegistration}
        data={supportedCryptoList}
        isLoading={loading}
      />
      <GenericModal open={openCrypto} onClose={() => setOpenCrypto(false)} size="small">
        <DepositCryptoForm cryptoList={currencyList} callback={handleRefetch} fundingWallet={fundingWallet} />
      </GenericModal>
      <div className={headingStyles.paymentHeadingWrapper}>
        <h1 className={headingStyles.headingXl}>Crypto Currencies</h1>
        <div className="flex gap-4 justify-between items-center">
          <CustomButton className="text-blue-800 w-40 p-1" onClick={handleRefetch}>
            Refresh Balances
          </CustomButton>
          <input
            type="text"
            name="search"
            value={search}
            className="border-2 p-1 rounded"
            placeholder="Search Currency"
            onChange={handleSearch}
          />
          <CustomButton className="text-blue-800 w-16 p-1" onClick={() => setOpenCrypto(true)}>
            Deposit
          </CustomButton>
          {/* <CustomButton className="text-blue-800 p-1" onClick={() => setOpenRegistration(true)}>
            <AddIcon />
          </CustomButton> */}
        </div>
      </div>
      {isWalletLoading ? (
        <div className={circleStyles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          {fundingWallet && filterCurrency.currency ? (
            <div className="flex flex-wrap gap-4">
              {filterCurrency.currency.map(
                (
                  currency: { type: string; symbolImageUrl: string; balance: number; id: string; network: string },
                  index: number,
                ) => (
                  <PrimaryCard
                    key={index}
                    title={currency.type}
                    network={currency.network}
                    value={currency.balance}
                    icon={currency.symbolImageUrl}
                    tooltipTitle={toolTipMap.title}
                    tooltipValue={toolTipMap.value}
                    tooltipNetwork={toolTipMap.network}
                    id={currency.id}
                  />
                ),
              )}
            </div>
          ) : (
            <p>Please register or add a supported crypto currency</p>
          )}
        </div>
      )}
    </div>
  );
};
