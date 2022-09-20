import React, { FC, useEffect, useState } from 'react';
import PrimaryCard from '../../components/CryptoCard/PrimaryCard';
import { CryptoList } from '../../components/CryptoList';
import CustomButton from '../../components/CustomButton';
import { PurchaseDialog } from '../../components/PurchaseDialog';
import Divider from '../../componentsv2/Divider';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../../store/actions/alerts';
import { FundingWallet as FundingWalletTypes, PaymentMethodTypes, SupportedCurrenciesTypes } from '../../types';
import { FiPlus } from 'react-icons/fi';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { CircularProgress } from '@material-ui/core';
import { CryptoDialog } from '../../components/CryptoDialog';
import GenericModal from '../../components/GenericModal';
import DepositCryptoForm from '../../components/Forms/DepositCryptoForm';

const FundingWallet: FC = () => {
  const dispatch = useDispatch();
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);
  const [fundingWallet, setFundingWallet] = useState<FundingWalletTypes[]>([]);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [coiins, setCoiins] = useState<FundingWalletTypes[]>([]);
  const [otherCurrencies, setOtherCurrencies] = useState<FundingWalletTypes[]>([]);
  const [creditCards, setCreditCards] = useState<PaymentMethodTypes[]>([]);
  const [isWalletLoading, setIsWalletLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [currencyList, setCurrencyList] = useState<SupportedCurrenciesTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsCurrencyLoading(true);
      await ApiClient.getFundingWallet()
        .then((resp) => {
          const filterCoiin = resp.filter((item) => item.type === 'COIIN');
          const filterOtherCurrencies = resp.filter((item) => item.type !== 'COIIN');
          setCoiins(filterCoiin);
          setOtherCurrencies(filterOtherCurrencies);
          setFundingWallet(resp);
        })
        .catch((error) => {
          dispatch(showErrorAlert(error.message));
        })
        .finally(() => {
          setIsCurrencyLoading(false);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsWalletLoading(true);
    ApiClient.getPaymentMethods()
      .then((res) => setCreditCards(res))
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => setIsWalletLoading(false));
  }, []);

  useEffect(() => {
    ApiClient.getSupportedCurrencies()
      .then((res) => setCurrencyList(res))
      .catch((error) => dispatch(showErrorAlert(error.message)));
  }, []);

  const toolTipMap = {
    title: 'Token',
    value: 'Balance',
    network: 'Network',
  };
  const toolTipForCreditCard = {
    title: 'Credit Card Type',
    value: 'Last Four Digits of Card',
  };

  const handleRefetch = () => {
    setRefetch(new Date().getTime());
  };

  return (
    <div className="border-2 border-denimBlue rounded-3xl p-4">
      <h1 className="text-xl text-denimBlue">Wallet</h1>
      <Divider />
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} />
      <CryptoDialog isTokenRegistration={true} open={openDialog} setOpenDialog={setOpenDialog} />
      <GenericModal open={openCrypto} onClose={() => setOpenCrypto(false)} size="small">
        <DepositCryptoForm cryptoList={currencyList} callback={handleRefetch} fundingWallet={fundingWallet} />
      </GenericModal>
      <CustomButton
        onClick={() => setPurchaseCoiin(true)}
        className="bg-cyberYellow rounded-full px-3 py-2 w-auto my-6"
      >
        Purchase Coiin Points
      </CustomButton>
      {isCurrencyLoading ? (
        <CircularProgress size={22} />
      ) : (
        <div className="mb-6">
          {coiins?.map((coiin: FundingWalletTypes) => (
            <PrimaryCard
              key={coiin.type}
              title={coiin.type}
              network={coiin.network}
              value={coiin.balance}
              icon={coiin.symbolImageUrl}
              tooltipTitle={toolTipMap.title}
              tooltipValue={toolTipMap.value}
              tooltipNetwork={toolTipMap.network}
            />
          ))}
        </div>
      )}

      <Divider />
      <div className="my-6 flex gap-6">
        <CustomButton
          onClick={() => setOpenCrypto(true)}
          className="bg-cyberYellow rounded-full px-3 py-2 w-auto flex items-center gap-2"
        >
          <FiPlus size={20} /> <span>Deposit Crypto</span>
        </CustomButton>
        <CustomButton
          onClick={() => setOpenDialog(true)}
          className="bg-cyberYellow rounded-full px-3 py-2 w-auto flex items-center gap-2"
        >
          <FiPlus size={20} /> <span>Register ERC20 Token</span>
        </CustomButton>
      </div>
      {isCurrencyLoading ? (
        <CircularProgress size={22} />
      ) : (
        <div className="mb-6 flex flex-wrap gap-4">
          {otherCurrencies?.map((coiin: FundingWalletTypes) => (
            <PrimaryCard
              key={coiin.type}
              title={coiin.type}
              network={coiin.network}
              value={coiin.balance}
              icon={coiin.symbolImageUrl}
              tooltipTitle={toolTipMap.title}
              tooltipValue={toolTipMap.value}
              tooltipNetwork={toolTipMap.network}
            />
          ))}
        </div>
      )}

      <Divider />
      <div>
        <CustomButton
          onClick={() => setPurchaseCoiin(true)}
          className="bg-cyberYellow rounded-full px-3 py-2 w-auto flex items-center gap-2 my-6"
        >
          <FiPlus size={20} /> <span>Add Credit Card</span>
        </CustomButton>
        {isWalletLoading ? (
          <CircularProgress size={22} />
        ) : (
          <div className="mb-6 flex flex-wrap gap-4">
            {creditCards?.map((payment: PaymentMethodTypes) => (
              <PrimaryCard
                key={payment.id}
                title={payment.brand}
                value={`*${payment.last4}`}
                tooltipTitle={toolTipForCreditCard['title']}
                tooltipValue={toolTipForCreditCard['value']}
                icon={<BsCreditCard2BackFill />}
                id={payment.id}
                // removeMethod={performDeletion}
                // removeLoading={removeLoading && removalId === payment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingWallet;
