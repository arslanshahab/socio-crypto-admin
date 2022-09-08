import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ChannelMediaObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import FileUpload from '../../../componentsv2/FileUpload';
import CustomButton from '../../CustomButton/CustomButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import initialState from '../../../store/initialState';
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
  const onSuccess = (index: number, data: FileObject) => {
    const medias = [...channelMedias];
    const id = medias?.[index]?.id;
    medias[index] = { channel: channel, id, media: data, isDefault: medias[index].isDefault };
    onChange(channel, medias);
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  const addMedia = () => {
    debugger;

    if (channelMedias.length < 5) {
      const medias = [...channelMedias];
      medias.push({ channel: channel, media: initialState.newCampaign.campaignImage, isDefault: false });
      onChange(channel, medias);
    } else {
      dispatch(showErrorAlert('You cannot add more than 5 media items for a social channel'));
    }
  };

  const removeMedia = (index: number) => {
    debugger;
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
      <Box className="w-full flex flex-row justify-between items-center mb-2">
        <img src={socialIcons[channel]} alt={channel} />
        <CustomButton
          className="w-40 h-8 ml-5 rounded-md text-white text-md border-2 border-green-600 bg-green-600"
          onClick={addMedia}
        >
          <AddIcon className="mr-2" style={{ fontSize: '18px' }} />
          <span>Add Media</span>
        </CustomButton>
      </Box>
      <Box className="w-full flex flex-row flex-wrap">
        {channelMedias &&
          channelMedias.map((item, index) => (
            <Box className="flex flex-col items-center w-80 mr-5" key={index.toString()}>
              <FileUpload
                value={item.media}
                label={`Add ${channel} Image`}
                updateLabel={`Update ${channel} Image`}
                mediaType="sharedMedia"
                tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
                onFileSuccess={(data) => onSuccess(index, data)}
                onFileError={onError}
                removeImage={() => removeMedia(index)}
              />
              {/* {index === 0 && <p className="text-sm text-gray-400 mt-3">Default Media</p>} */}
              {/* {index !== 0 && (
                <CustomButton
                  className="w-48 mt-3 rounded-md text-red-600 text-sm bg-transparent"
                  onClick={() => removeMedia(index)}
                >
                  <CloseIcon className="mr-1" style={{ fontSize: '18px' }} />
                  <span>Remove Media</span>
                </CustomButton>
              )} */}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ChannelMediaForm;
