import React, { FC } from 'react';
import CampaignsTable from '../../componentsv2/CampaignsTable';
import PastCampaigns from '../../componentsv2/PastCampaigns';
import './campaigns.scss';

const Campaigns: FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="campaignSection">
      <ul className="mb-4 rounded-full inline-flex h-10 bg-orangeYellow" role="tablist">
        <li className="inline-block h-full">
          <a
            className={`rounded-full block text-black h-full py-2 px-6 text-sm ${
              openTab === 1 ? 'bg-cyberYellow' : 'bg-orangeYellow'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#current campaign"
            role="tablist"
          >
            Current Campaigns
          </a>
        </li>
        <li className="inline-block h-full">
          <a
            className={`rounded-full block text-black h-full py-2 px-6 text-sm ${
              openTab === 2 ? 'bg-cyberYellow' : 'bg-orangeYellow'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="#link3"
            role="tablist"
          >
            Past Campaigns
          </a>
        </li>
      </ul>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0 rounded -z-1 dark:bg-gray-700 dark:z-1">
        <div className="py-5 flex-auto">
          <div className="tab-content tab-space">
            {openTab === 1 && (
              <div className={openTab === 1 ? 'block' : 'hidden'} id="link2">
                <CampaignsTable />
              </div>
            )}
            {openTab === 2 && (
              <div className={openTab === 2 ? 'block' : 'hidden'} id="link3">
                <PastCampaigns />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
