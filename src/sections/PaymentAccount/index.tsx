import React, { FC } from 'react';
import FundingWallet from '../FundingWallet';

const PaymentAccount: FC = () => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div>
      <ul className="m-6  gap-6 inline-flex h-10" role="tablist">
        <li className="inline-block h-full">
          <a
            className={`uppercase rounded block text-black h-full py-2 px-6 text-sm ${
              openTab === 1 ? 'bg-cyberYellow' : 'border border-cyberYellow'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#current campaign"
            role="tablist"
          >
            Funding Wallet
          </a>
        </li>
        <li className="inline-block h-full">
          <a
            className={`uppercase rounded block text-black h-full py-2 px-6 text-sm ${
              openTab === 2 ? 'bg-cyberYellow' : 'border border-cyberYellow'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="#link3"
            role="tablist"
          >
            Campaigns
          </a>
        </li>
        <li className="inline-block h-full">
          <a
            className={`uppercase rounded block text-black h-full py-2 px-6 text-sm ${
              openTab === 3 ? 'bg-cyberYellow' : 'border border-cyberYellow'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
            data-toggle="tab"
            href="#link3"
            role="tablist"
          >
            Transaction History
          </a>
        </li>
      </ul>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0  rounded -z-1 dark:bg-gray-700 dark:z-1">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? 'block' : 'hidden'} id="link2">
              <FundingWallet />
            </div>
            <div className={openTab === 2 ? 'block' : 'hidden'} id="link3">
              <p className="dark:text-white">Campaings</p>
              Dynamically innovate resource-leveling customer service for state of the art customer service.
            </div>
            <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
              <p className="dark:text-white">Transaction History</p>
              Dynamically innovate resource-leveling customer service for state of the art customer service.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAccount;
