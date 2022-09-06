import React, { FC } from 'react';
import CampaignsTable from '../../componentsv2/CampaignsTable';

const userData = [
  {
    id: 23123,
    name: 'Jude abaga',
    email: 'jude.abaga@abaga.com',
    date: 1237682923189813,
    status: 'pending',
  },
  {
    id: 23128,
    name: 'Dev abaga',
    email: 'devabaga@abaga.com',
    date: 111237682923189813,
    status: 'verified',
  },
];
const Campaigns: FC = () => {
  return (
    <div>
      <CampaignsTable headers={['Campaign Name', 'Status', 'Participation', 'status']} data={userData} />
    </div>
  );
};

export default Campaigns;
