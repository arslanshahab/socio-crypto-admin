import React, { useState } from 'react';
import { CreditCardList } from './CreditCardList';
import { CryptoList } from './CryptoList';
import { GetFundingWalletResponse } from '../types';
import { CryptoDialog } from './CryptoDialog';
import { PurchaseDialog } from './PurchaseDialog';
import { RefetchWallet } from './PaymentsAccount';
import CustomButton from './CustomButton';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const FundingWallet: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);

  return (
    <div>
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} refetchWallet={refetchWallet} />
      <CryptoDialog
        isTokenRegistration={true}
        open={openDialog}
        setOpenDialog={setOpenDialog}
        refetchWallet={refetchWallet}
      />
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
      <CryptoList data={data} isLoading={isLoading} refetchWallet={refetchWallet} />
      <CreditCardList />
    </div>
  );
};
