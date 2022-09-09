import React, { FC, useEffect, useState } from 'react';
import PrimaryCard from '../../components/CryptoCard/PrimaryCard';
import { CryptoList } from '../../components/CryptoList';
import CustomButton from '../../components/CustomButton';
import { PurchaseDialog } from '../../components/PurchaseDialog';
import Divider from '../../componentsv2/Divider';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../../store/actions/alerts';
import { FundingWallet } from '../../types';

const FundingWallet: FC = () => {
  const dispatch = useDispatch();
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);
  const [fundingWallet, setFundingWallet] = useState<FundingWallet[]>([]);
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsWalletLoading(true);
      await ApiClient.getFundingWallet()
        .then((resp) => {
          setFundingWallet(resp);
        })
        .catch((error) => {
          dispatch(showErrorAlert(error.message));
        })
        .finally(() => {
          setIsWalletLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="border-2 border-denimBlue rounded-3xl">
      <h1 className="text-xl text-denimBlue">Wallet</h1>
      <Divider />
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} />
      <CustomButton onClick={() => setPurchaseCoiin(true)} className="bg-cyberYellow rounded-full px-3 py-2 w-auto">
        Purchase Coiin Points
      </CustomButton>
      {/* <PrimaryCard
        title={currency.type}
        network={currency.network}
        value={currency.balance}
        icon={currency.symbolImageUrl}
        tooltipTitle={toolTipMap.title}
        tooltipValue={toolTipMap.value}
        tooltipNetwork={toolTipMap.network}
      /> */}
    </div>
  );
};

export default FundingWallet;
