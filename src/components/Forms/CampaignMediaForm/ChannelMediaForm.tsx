import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ChannelMediaObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import FileUpload from '../../../componentsv2/FileUpload';
import InstagramIcon from '../../../assets/svg/socialIcons/InstagramLogo.svg';
import TwitterIcon from '../../../assets/svg/socialIcons/TwitterLogo.svg';
import FacebookIcon from '../../../assets/svg/socialIcons/FBLogo.svg';
import TiktokIcon from '../../../assets/svg/socialIcons/TikTokLogo.svg';

export interface Props {
  channel: string;
  channelMedias: ChannelMediaObject[];
  onChange: (channel: string, list: ChannelMediaObject[]) => void;
}

const ChannelMediaForm: React.FC<Props> = ({ channel, channelMedias, onChange }) => {
  const dispatch = useDispatch();
  const [channelMedia, setChannelMedia] = useState<ChannelMediaObject[]>(channelMedias);

  const onSuccess = (data: FileObject) => {
    const medias = [...channelMedia];
    medias.push({ channel: channel, media: data, isDefault: medias.length < 1 ? true : false });
    setChannelMedia(medias);
    onChange(channel, medias);
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  const removeMedia = (index: number) => {
    if (channelMedia.length > 1) {
      const medias = [...channelMedia];
      medias.splice(index, 1);
      if (medias[0].isDefault !== true) {
        medias[0].isDefault = true;
      }
      setChannelMedia(medias);
      onChange(channel, medias);
    } else {
      dispatch(showErrorAlert('You need to add one media for each social channel you selected'));
    }
  };

  const socialIcons: { [index: string]: string } = {
    Facebook: FacebookIcon,
    Twitter: TwitterIcon,
    Instagram: InstagramIcon,
    Tiktok: TiktokIcon,
  };

  return (
    <Box className="w-full flex flex-col flex-wrap">
      <Box className="w-full flex items-center gap-6 mb-2">
        <img src={socialIcons[channel]} alt={channel} />
        <div className="flex gap-4">
          {channelMedia?.map((image: ChannelMediaObject, index: number) => {
            return (
              <div key={index} className="relative">
                <div
                  className="w-4 h-4 flex justify-center items-center  absolute right-0 bg-white rounded-full cursor-pointer hover:bg-cyberYellow z-10"
                  style={{ fontSize: '8px' }}
                  onClick={() => removeMedia(index)}
                >
                  &#10060;
                </div>

                {image.media.format.includes('image') ? (
                  <div className="w-20 h-20  bg-lightGray rounded-md">
                    <img
                      src={image.media.file}
                      alt={image.media.format}
                      className="w-full h-full rounded-md object-contain"
                    />
                  </div>
                ) : (
                  image.media.format.includes('video') && (
                    <div className="w-20 h-20  bg-lightGray rounded-md">
                      <video
                        autoPlay={false}
                        src={image.media.file}
                        controls={true}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
        <div className="">
          <FileUpload
            label={`Add ${channel} Image`}
            updateLabel={`Update ${channel} Image`}
            mediaType="sharedMedia"
            tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
            onFileSuccess={onSuccess}
            onFileError={onError}
          />
        </div>
      </Box>
    </Box>
  );
};

export default ChannelMediaForm;
