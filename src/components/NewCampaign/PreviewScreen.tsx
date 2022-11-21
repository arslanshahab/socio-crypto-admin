import React, { Fragment } from 'react';
import { ActionsProps } from './StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import Actions from './Actions';
import { format } from 'date-fns';
import InstagramIcon from '../../assets/png/socialPlatForms/Instagram-Icon 2.png';
import TwitterIcon from '../../assets/png/socialPlatForms/Twitter-logo 2.png';
import FacebookIcon from '../../assets/png/socialPlatForms/FBLogo.png';
import TiktokIcon from '../../assets/png/socialPlatForms/TikTok-icon-glyph 2.png';
import './newCampaign.scss';
import CampaignMedia from '../Forms/CampaignMediaForm/CampaignMedia';
import { useSelector } from 'react-redux';
import ChannelMedia from '../Forms/CampaignMediaForm/ChannelMedia';
import { ChannelMediaTypes } from '../../types';
import twitterPhone from '../../assets/png/medias/twitter.png';
import instagramPhone from '../../assets/png/medias/instagram.png';
import facebookPhone from '../../assets/png/medias/facebook.png';
import tiktokPhone from '../../assets/png/medias/tiktok.png';
import twitterPhone2 from '../../assets/png/medias/twitter3x4.png';
import twitterHz from '../../assets/png/medias/twitterHz.png';
import instagramPhone2 from '../../assets/png/medias/instagram3x4.png';
import instagramHz from '../../assets/png/medias/instagramHz.png';
import facebookPhone2 from '../../assets/png/medias/facebook3x4.png';
import facebookHz from '../../assets/png/medias/facebookHz.png';

const PreviewScreen: React.FC<ActionsProps> = ({
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const channelMediaList = useSelector((state: { channelMedia: ChannelMediaTypes }) => state.channelMedia);
  const submit = () => {
    if (handleSubmit) {
      handleSubmit({ ...campaign });
    }
  };

  const getIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'facebook':
        return FacebookIcon;
      case 'instagram':
        return InstagramIcon;
      case 'tiktok':
        return TiktokIcon;
      case 'twitter':
        return TwitterIcon;
      default:
        return TwitterIcon;
    }
  };

  const previewData = [
    {
      key: 'Title',
      value: campaign.name,
    },
    {
      key: 'Type',
      value: campaign.config.campaignType,
    },
    {
      key: 'Social Media Channels',
      value: campaign.config.socialMediaType.map((x) => x),
    },
    {
      key: 'Budget Type',
      value: campaign.config.type,
    },
    {
      key: 'Total Budget',
      value: `${campaign.config.coiinBudget} ${campaign.config.cryptoSymbol.toUpperCase()}`,
    },
    {
      key: 'Duration',
      value:
        campaign.beginDate &&
        campaign.endDate &&
        `${format(new Date(campaign.beginDate), 'MMM dd YYY')} -- ${format(new Date(campaign.endDate), 'MMM dd YYY')}`,
    },
    {
      key: 'Landing Page URL',
      value: campaign.target,
    },
    {
      key: 'Tags',
      value: campaign.suggestedTags.map((tag) => tag),
    },
  ];

  const channelMedias = [
    {
      step: 2,
      channelName: 'Twitter',
      firstMedia: channelMediaList.twitter.first,
      secondMedia: channelMediaList.twitter.second,
      thirdMedia: channelMediaList.twitter.third,
      socialPlatFormImage: twitterPhone,
      secondMobileImage: twitterPhone2,
      horizontalVideo: twitterHz,
      title: 'Your Twitter Media',
      isActive: Boolean(channelMediaList.twitter.first.length),
      twitterTempates: campaign.config.channelTemplates.Twitter,
    },
    {
      step: 3,
      channelName: 'Instagram',
      firstMedia: channelMediaList.instagram.first,
      secondMedia: channelMediaList.instagram.second,
      thirdMedia: channelMediaList.instagram.third,
      socialPlatFormImage: instagramPhone,
      secondMobileImage: instagramPhone2,
      horizontalVideo: instagramHz,
      title: 'Your Instagram Media',
      isActive: Boolean(channelMediaList.instagram.first.length),
      twitterTempates: campaign.config.channelTemplates.Instagram,
    },
    {
      step: 4,
      channelName: 'Facebook',
      firstMedia: channelMediaList.facebook.first,
      secondMedia: channelMediaList.facebook.second,
      thirdMedia: channelMediaList.facebook.third,
      socialPlatFormImage: facebookPhone,
      secondMobileImage: facebookPhone2,
      horizontalVideo: facebookHz,
      title: 'Your Facebook Media',
      isActive: Boolean(channelMediaList.facebook.first.length),
      twitterTempates: campaign.config.channelTemplates.Facebook,
    },
    {
      step: 5,
      channelName: 'Tiktok',
      firstMedia: channelMediaList.tiktok.first,
      socialPlatFormImage: tiktokPhone,
      title: 'Your Tiktok Media',
      isActive: Boolean(channelMediaList.tiktok.first.length),
      twitterTempates: campaign.config.channelTemplates.Tiktok,
    },
  ];

  return (
    <div className="previewScreenWrapper">
      <div className="campaignInfoWrapper">
        <h1>Verify Campaign Information</h1>
        <div className="campaignInfoOutline">
          {previewData.map((x: any) => {
            return (
              <div className="gridRow" key={x.key}>
                <div className="firstCol">
                  <p>{x.key}</p>
                </div>
                <div className="secondCol">
                  {x.key === 'Social Media Channels' || x.key === 'Tags' ? (
                    <Fragment>
                      {x.key === 'Social Media Channels' && (
                        <div className="socialIconsWrapper">
                          {x.value.map((y: string, i: number) => (
                            <div key={i} className="imageWrapper">
                              <img src={getIcon(y)} />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="tagValueWrapper">
                        {x.key === 'Tags' && (
                          <div className="tagBar flex">
                            {x.value.map((tag: string, i: number) => (
                              <span key={i}>
                                <p>{tag}</p>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Fragment>
                  ) : (
                    <p>{x.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="campaignMediaPreview">
          <CampaignMedia
            title="Your campaign image cover for the raiinmaker app"
            campaignImage={campaign.campaignImage}
            isPreview={true}
          />
        </div>
        {channelMedias.map((x, i) => {
          if (campaign.config.socialMediaType.includes(x.channelName))
            return (
              <div key={i} className="channelDetailsPreview">
                <div className="socialIcons">
                  <div className="socialIcons">
                    <img src={getIcon(x.channelName)} />
                  </div>
                </div>
                <ChannelMedia
                  steps={x.step}
                  channelName={x.channelName}
                  firstMedia={x.firstMedia}
                  secondMedia={x.secondMedia}
                  thirdMedia={x.thirdMedia}
                  socialPlatFormImage={x.socialPlatFormImage}
                  secondMobileImage={x.secondMobileImage}
                  horizontalVideo={x.horizontalVideo}
                  isPreview={true}
                  title={x.title}
                />
                <div className="channelTemplates">
                  {x.twitterTempates?.map((x, i) => (
                    <div key={i} className="templateOutline">
                      <p>{x.post}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
        })}
      </div>
      <Actions
        activeStep={activeStep}
        firstStep={firstStep}
        finalStep={finalStep}
        handleBack={handleBack}
        handleNext={handleNext}
        handleSubmit={submit}
      />
    </div>
  );
};

export default PreviewScreen;
