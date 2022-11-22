import React, { FC } from 'react';
import './campaignPostForm.scss';
import { ChannelTemplateObject } from '../../../types';
import CustomButton from '../../CustomButton';
import { MdAdd } from 'react-icons/md';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface TemplateStepsIProps {
  channelTemplates: ChannelTemplateObject[];
  addPost: (channel: string) => void;
  handlePostChange: (channel: string, index: number, data: string) => void;
  removePost: (channel: string, index: number) => void;
  socialIcon: string;
  phoneImage: string;
  platform: string;
}

const CampaignTemplate: FC<TemplateStepsIProps> = ({
  channelTemplates,
  handlePostChange,
  addPost,
  removePost,
  socialIcon,
  phoneImage,
  platform,
}) => {
  return (
    <div className="campaignTemplateWrapper">
      <div className="templateGrid">
        <div className="imageSection">
          <img src={socialIcon} alt="social icon" />
          <div className="phoneImage">
            <img src={phoneImage} />
          </div>
          <p>User Post Templates</p>
        </div>
        <div className="contentSection">
          <div className="addButtonWrapper">
            <CustomButton className="addTempButton" onClick={() => addPost(platform)}>
              <MdAdd className="mr-2" />
              <span>Add Template</span>
            </CustomButton>
          </div>
          {channelTemplates.map((x, i) => (
            <div className="templateFieldWrapper" key={i}>
              <textarea
                placeholder={`User Post Template ${i + 1}*`}
                onChange={(e) => handlePostChange(x.channel, i, e.target.value)}
                value={x.post}
              />
              <div className="templateContentWrapper">
                {i >= 2 ? (
                  <CustomButton className="remove" onClick={() => removePost(x.channel, i)}>
                    <IoCloseCircleOutline className="closeIcon" />
                    <span>Remove Post</span>
                  </CustomButton>
                ) : (
                  <p></p>
                )}
                <p>Characters added 0/2,200</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignTemplate;
