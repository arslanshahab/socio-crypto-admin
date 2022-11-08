import React, { FC, Fragment, useState } from 'react';
import FileUpload from '../../../componentsv2/FileUpload';
import { ChannelMediaObject, FileObject } from '../../../types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface MediaStepsIProps {
  steps: number;
  socialMediaType: string[];
  channelMedia: ChannelMediaObject[];
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelName: string;
  socialPlatFormImage: string;
  secondMobileImage?: string;
  horizontalVideo?: string;
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ChannelMedia: FC<MediaStepsIProps> = ({
  onSuccess,
  onError,
  channelMedia,
  channelName,
  socialPlatFormImage,
  steps,
  secondMobileImage,
  horizontalVideo,
}) => {
  //   const [medias, setMedias] = useState<ChannelMediaObject[]>(() => channelMedia);
  //   console.log('step-----', steps);
  //   console.log('channel media----------', channelMedia);
  //   //   console.log('media----------', medias);
  const [firstChannelMedia, setFirstChannelMedia] = useState<ChannelMediaObject[]>([]);
  const [secondChannelMedia, setSecondChannelMedia] = useState<ChannelMediaObject[]>([]);
  const [thirdChannelMedia, setThirdChannelMedia] = useState<ChannelMediaObject[]>([]);

  //   useEffect(() => {
  //     return () => {
  //       setFirstChannelMedia([]);
  //       setSecondChannelMedia([]);
  //     };
  //   }, [steps]);

  const handleChannelMedia = (data: FileObject) => {
    const updatedMedia = [...firstChannelMedia];
    updatedMedia.push({ channel: channelName, media: data, isDefault: updatedMedia.length < 1 ? true : false });
    setFirstChannelMedia(updatedMedia);
    onSuccess(channelName, updatedMedia);
  };

  const handleSecondChannelMedia = (data: FileObject) => {
    const updatedMedia = [...channelMedia];
    updatedMedia.push({ channel: channelName, media: data, isDefault: updatedMedia.length < 1 ? true : false });
    setSecondChannelMedia(updatedMedia);
    onSuccess(channelName, updatedMedia);
  };

  const handleThirdChannelMedia = (data: FileObject) => {
    const updatedMedia = [...channelMedia];
    updatedMedia.push({ channel: channelName, media: data, isDefault: updatedMedia.length < 1 ? true : false });
    setThirdChannelMedia(updatedMedia);
    onSuccess(channelName, updatedMedia);
  };

  return (
    <div className="channelMediaWrapper">
      <p>Upload media you want users to view & share on {channelName}</p>
      <div className="flex justify-evenly">
        {/* // ----------1x1 media----------- */}
        <div>
          <div className="imageContent">
            <div className={`imageWrapper${channelName}`}>
              <Slider {...settings}>
                {firstChannelMedia.length &&
                  firstChannelMedia.map((item, i) => (
                    <div key={i}>
                      <div className={`image${channelName}`}>
                        {item.media.format.includes('image') ? (
                          <img src={item.media.file} />
                        ) : (
                          <video autoPlay={false} src={item.media.file} controls={true} />
                        )}
                      </div>
                    </div>
                  ))}
              </Slider>

              <div className="mobileImage">
                <img src={socialPlatFormImage} alt="campaign media phone" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <FileUpload
              label="1&#215;1 Photo/Video"
              updateLabel="Update Campaign Image"
              mediaType="sharedMedia"
              onFileSuccess={handleChannelMedia}
              onFileError={onError}
            />
          </div>
        </div>
        {secondMobileImage && horizontalVideo && (
          <Fragment>
            {/* // ----------- 3x4--------- */}
            <div>
              <div className="imageContent">
                <div className="imageWrapper">
                  <Slider {...settings}>
                    {secondChannelMedia.length &&
                      secondChannelMedia.map((item, i) => (
                        <div className={`image3x4${channelName}`} key={i}>
                          {item.media.format.includes('image') ? (
                            <img src={item.media.file} />
                          ) : (
                            <video autoPlay={false} src={item.media.file} controls={true} />
                          )}
                        </div>
                      ))}
                  </Slider>
                  <div className="mobileImage">
                    <img src={secondMobileImage} alt="campaign media phone" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <FileUpload
                  label="3&#215;4 Photo/Video"
                  updateLabel="Update Campaign Image"
                  mediaType="sharedMedia"
                  onFileSuccess={handleSecondChannelMedia}
                  onFileError={onError}
                />
              </div>
            </div>
            {/* // -----------horizontal--------- */}
            <div>
              <div className="imageContent">
                <div className="imageWrapper">
                  {thirdChannelMedia.length &&
                    thirdChannelMedia.map((item, i) => (
                      <div className={`video${channelName}`} key={i}>
                        <video autoPlay={false} src={item.media.file} controls={true} />
                      </div>
                    ))}
                  <div className="mobileImage">
                    <img src={horizontalVideo} alt="campaign media phone" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <FileUpload
                  label="Horizontal Video"
                  updateLabel="Update Campaign Image"
                  mediaType="sharedMedia"
                  onFileSuccess={handleThirdChannelMedia}
                  onFileError={onError}
                />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ChannelMedia;
