import React, { FC } from 'react';
import CampaignsTable from '../../componentsv2/CampaignsTable';
import PastCampaigns from '../../componentsv2/PastCampaigns';
import './campaigns.scss';

const Campaigns: FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="campaignSection">
      <ul role="tablist">
        <li>
          <a
            className={openTab === 1 ? 'activeTab' : 'inactiveTab'}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#current campaigns"
            role="tablist"
          >
            Current Campaigns
          </a>
        </li>
        <li>
          <a
            className={openTab === 2 ? 'activeTab' : 'inactiveTab'}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="past campaigns"
            role="tablist"
          >
            Past Campaigns
          </a>
        </li>
      </ul>
      <div className="tabBody">
        {openTab === 1 && (
          <div className={openTab === 1 ? 'block' : 'hidden'}>
            <CampaignsTable />
          </div>
        )}
        {openTab === 2 && (
          <div className={openTab === 2 ? 'block' : 'hidden'}>
            <PastCampaigns />
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
