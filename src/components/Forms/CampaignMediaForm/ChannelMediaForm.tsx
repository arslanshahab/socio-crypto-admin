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
import { MdDelete } from 'react-icons/md';

export interface Props {
  channel: string;
  channelMedias: ChannelMediaObject[];
  onChange: (channel: string, list: ChannelMediaObject[]) => void;
}

const ChannelMediaForm: React.FC<Props> = ({ channel, channelMedias, onChange }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<ChannelMediaObject[]>(channelMedias);

  const onSuccess = (data: FileObject) => {
    const inputKey = `${data.filename}-${Math.random()}`;
    const medias = [...images];
    if (images[0].media.filename === '') {
      const defaultMedia = [...images];
      defaultMedia.splice(0, 1, { channel: channel, id: '', media: data, isDefault: true });
      setImages(defaultMedia);
      onChange(channel, defaultMedia);
    } else {
      medias.push({ channel: channel, id: '', media: data, isDefault: false });
      setImages(medias);
      onChange(channel, medias);
    }
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  // const addMedia = () => {
  //   if (channelMedias.length < 5) {
  //     const medias = [...channelMedias];
  //     medias.push({ channel: channel, media: initialState.newCampaign.campaignImage, isDefault: false });
  //     onChange(channel, medias);
  //   } else {
  //     dispatch(showErrorAlert('You cannot add more than 5 media items for a social channel'));
  //   }
  // };

  const removeMedia = (index: number) => {
    if (channelMedias.length > 1) {
      const medias = [...channelMedias];
      medias.splice(index, 1);
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
          {images.map((image: ChannelMediaObject, index: number) => {
            return (
              <div key={index} className="relative">
                {/* {index ? (
                  <span className="absolute top-0 right-0">
                    <MdDelete color="red" onClick={() => removeMedia(index)} />
                  </span>
                ) : (
                  ''
                )} */}
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
                        className="w-full h-full object-contain"
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
