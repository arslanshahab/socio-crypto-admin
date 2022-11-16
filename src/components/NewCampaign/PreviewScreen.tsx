import { Box } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ActionsProps } from './StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import Actions from './Actions';
import { campaignTypeMenu } from '../Forms/CampaignSetupForm/CampaignTypeInput';
import { format } from 'date-fns';
// import CustomButton from '../CustomButton';
import { getSocialIcon } from '../Forms/CampaignSetupForm/SocialMediaTypeInput';
import InstagramIcon from '../../assets/svg/socialIcons/InstagramLogo.svg';
import TwitterIcon from '../../assets/svg/socialIcons/TwitterLogo.svg';
import FacebookIcon from '../../assets/svg/socialIcons/FBLogo.svg';
import TiktokIcon from '../../assets/svg/socialIcons/TikTokLogo.svg';
import './newCampaign.scss';

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
    {
      key: 'Tagline',
      value: campaign.tagline,
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
                        <div className="flex gap-4">
                          {x.value.map((y: string, i: number) => (
                            <div key={i}>
                              <img src={getIcon(y)} />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="overflow-x-scroll">
                        {x.key === 'Tags' && (
                          <div className="flex">
                            {x.value.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-2 mt-1 mr-2 rounded-full bg-coolGray flex flex-row justify-between items-center"
                              >
                                <p className="text-xs">{tag}</p>
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
