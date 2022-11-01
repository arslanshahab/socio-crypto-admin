import React, { FC } from 'react';
import { FileObject } from '../../../../types';
import CampaignAvatar from '../../../../assets/svg/campaignAvatar.svg';
import '../campaignInitializeForm.scss';

interface CampaignMediaIProps {
  campaignMedia: FileObject;
}

const CampaignMediaForm: FC<CampaignMediaIProps> = ({ campaignMedia }: CampaignMediaIProps) => {
  return (
    <div className="mediaContent">
      <img src={CampaignAvatar} alt={'campaign media'} />
      {campaignMedia.file && (
        <div className="imageWrapper">
          <img src={campaignMedia.file} alt={campaignMedia.filename} className="image" />
        </div>
      )}
    </div>
  );
};

export default CampaignMediaForm;
