import React, { FC } from 'react';
import CampaignsTable from '../../componentsv2/CampaignsTable';

const Campaigns: FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div>
      <ul className="mb-4 shadow-md rounded-full inline-flex h-10 bg-orangeYellow" role="tablist">
        <li className="inline-block h-full">
          <a
            className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
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
            className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
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
            Post Campaigns
          </a>
        </li>
      </ul>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-0 shadow-md rounded -z-1 dark:bg-gray-700 dark:z-1">
        <div className="px-4 py-5 flex-auto">
          <div className="tab-content tab-space">
            <div className={openTab === 1 ? 'block' : 'hidden'} id="link2">
              <CampaignsTable />
            </div>
            <div className={openTab === 2 ? 'block' : 'hidden'} id="link3">
              <p className="dark:text-white">Education</p>
              Dynamically innovate resource-leveling customer service for state of the art customer service.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
