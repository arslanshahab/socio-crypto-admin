import React, { FC } from 'react';
import campaignMediaPhone from '../../../assets/png/medias/campaignMedia.png';
import FileUpload from '../../../componentsv2/FileUpload';
import { FileObject } from '../../../types';

interface MediaStepsIProps {
  steps: number;
  campaignImage: FileObject;
  onCampaignImageSuccess: (data: FileObject) => void;
  onError: (msg: string) => void;
}

const CampaignMedia: FC<MediaStepsIProps> = ({ onCampaignImageSuccess, campaignImage, onError }) => {
  const handleCampaignImageSuccess = (data: FileObject) => {
    onCampaignImageSuccess(data);
  };

  return (
    <div className="campaignMediaWrapper">
      <p>Upload your campaign image cover for the raiinmaker app</p>
      <div className="imageContent">
        <div className="imageWrapper">
          <div className="imageSize">
            <img src={campaignImage.file} />
          </div>
          <div className="mobileImage">
            <img src={campaignMediaPhone} alt="campaign media phone" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <FileUpload
          label="Photo"
          updateLabel="Update Campaign Image"
          mediaType="campaignImage"
          onFileSuccess={handleCampaignImageSuccess}
          onFileError={onError}
        />
      </div>
    </div>
  );
};

export default CampaignMedia;
