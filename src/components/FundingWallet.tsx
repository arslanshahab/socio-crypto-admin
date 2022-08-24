import React, { useEffect, useState } from 'react';
import { CreditCardList } from './CreditCardList';
import { CryptoList } from './CryptoList';
import { CryptoDialog } from './CryptoDialog';
import { PurchaseDialog } from './PurchaseDialog';
import CustomButton from './CustomButton';
import { useLocation } from 'react-router-dom';

export const FundingWallet: React.FC = () => {
  const location: { state: boolean } = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);

  useEffect(() => {
    if (location.state) {
      setPurchaseCoiin(true);
    }
  }, [location.state]);

  return (
    <div>
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} />
      <CryptoDialog isTokenRegistration={true} open={openDialog} setOpenDialog={setOpenDialog} />
      <div className="flex justify-end gap-4">
        <CustomButton className="bg-blue-900 text-white w-44 rounded p-1.5" onClick={() => setPurchaseCoiin(true)}>
          Purchase Coiin Points
        </CustomButton>
        <CustomButton
          className="bg-blue-900 text-white w-44 rounded p-1.5"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Register ERC20 Token
        </CustomButton>
      </div>
      <CryptoList />
      <CreditCardList />
    </div>
  );
};
