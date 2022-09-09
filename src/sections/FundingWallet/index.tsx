import React, { FC, useEffect, useState } from 'react';
import PrimaryCard from '../../components/CryptoCard/PrimaryCard';
import { CryptoList } from '../../components/CryptoList';
import CustomButton from '../../components/CustomButton';
import { PurchaseDialog } from '../../components/PurchaseDialog';
import Divider from '../../componentsv2/Divider';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../../store/actions/alerts';
import { FundingWallet as FundingWalletTypes } from '../../types';

const FundingWallet: FC = () => {
  const dispatch = useDispatch();
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);
  const [fundingWallet, setFundingWallet] = useState<FundingWalletTypes[]>([]);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [coiins, setCoiins] = useState<FundingWalletTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsWalletLoading(true);
      await ApiClient.getFundingWallet()
        .then((resp) => {
          const filterCoiin = resp.filter((item) => item.type === 'COIIN');
          setCoiins(filterCoiin);
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

  const toolTipMap = {
    title: 'Token',
    value: 'Balance',
    network: 'Network',
  };

  return (
    <div className="border-2 border-denimBlue rounded-3xl p-4">
      <h1 className="text-xl text-denimBlue">Wallet</h1>
      <Divider />
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} />
      <CustomButton
        onClick={() => setPurchaseCoiin(true)}
        className="bg-cyberYellow rounded-full px-3 py-2 w-auto my-6"
      >
        Purchase Coiin Points
      </CustomButton>
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
  );
};

export default FundingWallet;
