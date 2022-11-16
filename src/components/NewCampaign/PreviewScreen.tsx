import React, { Fragment } from 'react';
import { ActionsProps } from './StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import Actions from './Actions';
// import { campaignTypeMenu } from '../Forms/CampaignSetupForm/CampaignTypeInput';
import { format } from 'date-fns';
// import CustomButton from '../CustomButton';
// import { getSocialIcon } from '../Forms/CampaignSetupForm/SocialMediaTypeInput';
import InstagramIcon from '../../assets/png/socialPlatForms/Instagram-Icon 2.png';
import TwitterIcon from '../../assets/png/socialPlatForms/Twitter-logo 2.png';
import FacebookIcon from '../../assets/png/socialPlatForms/FBLogo.png';
import TiktokIcon from '../../assets/png/socialPlatForms/TikTok-icon-glyph 2.png';
import './newCampaign.scss';
import CampaignMedia from '../Forms/CampaignMediaForm/CampaignMedia';
import { useSelector } from 'react-redux';
import ChannelMedia from '../Forms/CampaignMediaForm/ChannelMedia';
import { ChannelMediaTypes } from '../../types';
// import twitterPhone from '../../assets';
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

// type CampaignPreviewTypes = {
//   key: string;
//   value: string[]|string;
// };

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
  //   console.log('channelMediaReducer-----------------', channelMediaList);
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
      key: 'Description',
      value: campaign.description,
    },
    // {
    //   key: 'Tagline',
    //   value: campaign.tagline,
    // },
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
      firstTwitterMedia: channelMediaList.twitter.first,
      secondTwitterMedia: channelMediaList.twitter.second,
      thirdTwitterMedia: channelMediaList.twitter.third,
      socialPlatFormImage: twitterPhone,
      secondMobileImage: twitterPhone2,
      horizontalVideo: twitterHz,
      title: 'Your Twitter Media',
    },
    {
      step: 3,
      channelName: 'Instagram',
      firstTwitterMedia: channelMediaList.instagram.first,
      secondTwitterMedia: channelMediaList.instagram.second,
      thirdTwitterMedia: channelMediaList.instagram.third,
      socialPlatFormImage: instagramPhone,
      secondMobileImage: instagramPhone2,
      horizontalVideo: instagramHz,
      title: 'Your Instagram Media',
    },
    {
      step: 4,
      channelName: 'Facebook',
      firstTwitterMedia: channelMediaList.facebook.first,
      secondTwitterMedia: channelMediaList.facebook.second,
      thirdTwitterMedia: channelMediaList.facebook.third,
      socialPlatFormImage: facebookPhone,
      secondMobileImage: facebookPhone2,
      horizontalVideo: facebookHz,
      title: 'Your Facebook Media',
    },
    {
      step: 5,
      channelName: 'Tiktok',
      firstTwitterMedia: channelMediaList.tiktok.first,
      socialPlatFormImage: tiktokPhone,
      title: 'Your Tiktok Media',
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
        <div className="campaignMediaWrapper">
          <CampaignMedia
            title="Your campaign image cover for the raiinmaker app"
            campaignImage={campaign.campaignImage}
            isFileUpload={false}
          />
          {channelMedias.map((x, i) => (
            <ChannelMedia
              key={i}
              steps={x.step}
              channelName={x.channelName}
              firstTwitterMedia={x.firstTwitterMedia}
              secondTwitterMedia={x.secondTwitterMedia}
              thirdTwitterMedia={x.thirdTwitterMedia}
              socialPlatFormImage={x.socialPlatFormImage}
              secondMobileImage={x.secondMobileImage}
              horizontalVideo={x.horizontalVideo}
              isPreview={true}
              title={x.title}
            />
          ))}
        </div>
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
    // <Box className="w-full mt-10">
    //   <Box className="border-2 p-6 border-denimBlue rounded-3xl">
    //     <h2 className="text-gray-800 text-2xl mb-5 text-center">Verify Campaign Information</h2>
    //     <Box className="grid grid-cols-2 gap-4">
    //       <Box>
    //         <Box className="border p-6 border-denimBlue rounded-3xl">
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Title</h5>
    //             <h2 className="w-3/5 capitalize">{campaign.name}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Type</h5>
    //             <h2 className="w-3/5 capitalize">
    //               {campaignTypeMenu.find((item) => item.value === campaign.config.campaignType)?.name}
    //             </h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Social Media Channels</h5>
    //             <Box className="w-3/5 flex ">
    //               {campaign.config.socialMediaType.map((item) => (
    //                 <img key={item} className="w-10 mr-3" src={getSocialIcon[item]} alt="social-icon" />
    //               ))}
    //             </Box>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Budget Type</h5>
    //             <h2 className="w-3/5 capitalize">{campaign.config.type}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Total Budget</h5>
    //             <h2 className="w-3/5 capitalize">{`${
    //               campaign.config.coiinBudget
    //             } ${campaign.config.cryptoSymbol.toUpperCase()}`}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Duration</h5>
    //             <h2 className="text-gray-800 text-md">
    //               {campaign.beginDate &&
    //                 campaign.endDate &&
    //                 `${format(new Date(campaign.beginDate), 'MMM dd YYY')} -- ${format(
    //                   new Date(campaign.endDate),
    //                   'MMM dd YYY',
    //                 )}`}
    //             </h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Description</h5>
    //             <h2 className="w-3/5 capitalize">{campaign.description}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Tagline</h5>
    //             <h2 className="w-3/5 capitalize">{campaign.tagline}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center">
    //             <h5 className="w-2/5">Landing Page URL</h5>
    //             <h2 className="w-3/5 capitalize">{campaign.target}</h2>
    //           </Box>
    //           <Box className="flex p-2 mb-2 items-center overflow-x-scroll">
    //             <h5 className="w-1/6">Tags</h5>
    //             <Box className="w-5/6 flex flex-row">
    //               {campaign.suggestedTags.map((item, index) => (
    //                 <span
    //                   key={index}
    //                   className="px-3 py-2 mt-1 mr-2 rounded-full bg-coolGray flex flex-row justify-between items-center"
    //                 >
    //                   <p>{item}</p>
    //                 </span>
    //               ))}
    //             </Box>
    //           </Box>
    //         </Box>
    //         <Box className="border p-6 border-denimBlue rounded-3xl mt-6 flex justify-center flex-col items-center gap-4">
    //           <h5>Media</h5>
    //           <Box>
    //             <img
    //               src={campaign.campaignImage.file}
    //               alt="campaign-media"
    //               className="bg-lightGray rounded-3xl w-60 h-44 flex items-center justify-center"
    //             />
    //           </Box>
    //           <CustomButton className="bg-coolGray w-52 rounded-full px-4 py-2 mt-3">
    //             Preview Campaign Images
    //           </CustomButton>
    //         </Box>
    //       </Box>
    //       <Box className="border p-6 border-denimBlue rounded-3xl  overflow-y-auto" style={{ maxHeight: '950px' }}>
    //         <h5 className="text-center mb-3">Templates</h5>
    //         {Object.keys(campaign.config.channelTemplates).map((channel: string) => {
    //           return (
    //             <Box className="grid grid-cols-5" key={channel}>
    //               <img src={getIcon(channel)} alt={channel} />
    //               <div className="col-span-4">
    //                 <div className="grid grid-cols-2 gap-8">
    //                   {campaign.config.channelTemplates[channel].map((template, index2) => (
    //                     <div key={index2} className="bg-lightGray h-44 py-1 px-2 rounded-md mb-6">{`Post#${
    //                       index2 + 1
    //                     }: ${template.post}`}</div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </Box>
    //           );
    //         })}
    //       </Box>
    //     </Box>
    //   </Box>
    //   <Box className="w-full">
    //     <Actions
    //       activeStep={activeStep}
    //       firstStep={firstStep}
    //       finalStep={finalStep}
    //       handleBack={handleBack}
    //       handleNext={handleNext}
    //       handleSubmit={submit}
    //     />
    //   </Box>
    // </Box>
  );
};

export default PreviewScreen;
