import React, { FC, useEffect, useReducer, useState } from 'react';
import FileUpload from '../../../componentsv2/FileUpload';
import { ChannelMediaObject, FileObject } from '../../../types';

interface MediaStepsIProps {
  steps: number;
  socialMediaType: string[];
  channelMedia: ChannelMediaObject[];
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelName: string;
  socialPlatFormImage: string;
}

const ChannelMedia: FC<MediaStepsIProps> = ({
  onSuccess,
  onError,
  channelMedia,
  channelName,
  socialPlatFormImage,
  steps,
}) => {
  //   const [medias, setMedias] = useState<ChannelMediaObject[]>(() => channelMedia);
  //   console.log('step-----', steps);
  //   console.log('channel media----------', channelMedia);
  //   //   console.log('media----------', medias);

  const handleChannelMedia = (data: FileObject) => {
    const updatedMedia = [...channelMedia];
    updatedMedia.push({ channel: channelName, media: data, isDefault: updatedMedia.length < 1 ? true : false });
    onSuccess(channelName, updatedMedia);
  };

  return (
    <div className="channelMediaWrapper">
      <p>Upload media you want users to view & share on {channelName}</p>
      <div className="imageContent">
        <div className="imageWrapper">
          {channelMedia.length &&
            channelMedia.map((item, i) => (
              <div className={`image${channelName}`} key={i}>
                <img src={item.media.file} />
              </div>
            ))}
          <div className="mobileImage">
            <img src={socialPlatFormImage} alt="campaign media phone" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <FileUpload
          label="1&#215;1 Photo/Video"
          updateLabel="Update Campaign Image"
          mediaType="campaignImage"
          onFileSuccess={handleChannelMedia}
          onFileError={onError}
        />
      </div>
    </div>
  );
};

export default ChannelMedia;
