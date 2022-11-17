import React, { FC } from 'react';
import campaignMediaPhone from '../../../assets/png/medias/campaignMedia.png';
import FileUpload from '../../../componentsv2/FileUpload';
import { FileObject } from '../../../types';

interface MediaStepsIProps {
  title: string;
  steps?: number;
  campaignImage: FileObject;
  onCampaignImageSuccess?: (data: FileObject) => void;
  onError?: (msg: string) => void;
  isPreview?: boolean;
}

const CampaignMedia: FC<MediaStepsIProps> = ({ title, onCampaignImageSuccess, campaignImage, onError, isPreview }) => {
  const handleCampaignImageSuccess = (data: FileObject) => {
    if (onCampaignImageSuccess) onCampaignImageSuccess(data);
  };

  return (
    <div className="campaignMediaWrapper">
      <p>{title}</p>
      <div className="imageContent">
        <div className="imageWrapper">
          <div className="imageSize">{campaignImage.file && <img src={campaignImage.file} />}</div>
          <div className="mobileImage">
            <img src={campaignMediaPhone} alt="campaign media phone" />
          </div>
        </div>
      </div>
      {!isPreview && (
        <div className="flex justify-center">
          <FileUpload
            label="Photo"
            updateLabel="Update Campaign Image"
            mediaType="campaignImage"
            onFileSuccess={handleCampaignImageSuccess}
            onFileError={onError}
          />
        </div>
      )}
    </div>
  );
};

export default CampaignMedia;
