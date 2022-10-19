import React, { FC } from 'react';
import TierHeader from '../TierHeader';
import tagUserIcon from '../../assets/svg/tiers/tagUser.svg';
import TierDetailsLayout from '../../sections/TierDetailsLayout';

const CampaignThirdTier: FC = () => {
  return (
    <TierDetailsLayout>
      <TierHeader title={'Tier 3: Campaign By Channel '} image={tagUserIcon} />
    </TierDetailsLayout>
  );
};

export default CampaignThirdTier;
