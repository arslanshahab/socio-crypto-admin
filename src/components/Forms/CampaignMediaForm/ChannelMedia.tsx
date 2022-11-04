import React, { FC, useState } from 'react';
import FileUpload from '../../../componentsv2/FileUpload';
import { ChannelMediaObject, FileObject } from '../../../types';
import { MdCancel } from 'react-icons/md';

interface MediaStepsIProps {
  steps: number;
  socialMediaType: string[];
  channelMedia: ChannelMediaObject[];
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelName: string;
  socialPlatFormImage: string;
}

const ChannelMedia: FC<MediaStepsIProps> = ({ onSuccess, onError, channelMedia, channelName, socialPlatFormImage }) => {
  const [medias, setMedias] = useState<ChannelMediaObject[]>(channelMedia);

  const handleChannelMedia = (data: FileObject) => {
    const medias = [...channelMedia];
    // use pop for demo purpose
    if (channelMedia.length) medias.pop();
    medias.push({ channel: 'Twitter', media: data, isDefault: medias.length < 1 ? true : false });
    setMedias(medias);
    onSuccess('Twitter', medias);
  };

  return (
    <div className="channelMediaWrapper">
      <p>Upload media you want users to view & share on {channelName}</p>
      <div className="imageContent">
        <div className="imageWrapper">
          {medias.map((item, i) => (
            <div className={`image${channelName}`} key={i}>
              <img src={item.media.file} />
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              top: '0',
            }}
          >
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
