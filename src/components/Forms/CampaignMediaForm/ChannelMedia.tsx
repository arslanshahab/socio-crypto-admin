import React, { FC, Fragment } from 'react';
import FileUpload from '../../../componentsv2/FileUpload';
import { ChannelMediaObject, FileObject } from '../../../types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { TiDelete } from 'react-icons/ti';

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
  handleFirstMedia: (channel: string, size: string, data: FileObject, mediaSlug: string) => void;
  firstTwitterMedia?: ChannelMediaObject[];
  secondTwitterMedia?: ChannelMediaObject[];
  thirdTwitterMedia?: ChannelMediaObject[];
  firstInstagramMedia?: ChannelMediaObject[];
  secondInstagramMedia?: ChannelMediaObject[];
  thirdInstagramMedia?: ChannelMediaObject[];
  firstFacebookMedia?: ChannelMediaObject[];
  secondFacebookMedia?: ChannelMediaObject[];
  thirdFacebookMedia?: ChannelMediaObject[];
  tiktokMedia?: ChannelMediaObject[];
  removeChannelMedia: (index: number, data: ChannelMediaObject, size: string) => void;
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ChannelMedia: FC<MediaStepsIProps> = ({
  //   onSuccess,
  onError,
  channelName,
  socialPlatFormImage,
  steps,
  secondMobileImage,
  horizontalVideo,
  firstTwitterMedia,
  handleFirstMedia,
  firstInstagramMedia,
  secondTwitterMedia,
  secondInstagramMedia,
  thirdTwitterMedia,
  thirdInstagramMedia,
  firstFacebookMedia,
  secondFacebookMedia,
  thirdFacebookMedia,
  tiktokMedia,
  removeChannelMedia,
}) => {
  const handleTwitterMedia = (data: FileObject) => {
    const imageSlug = `${channelName}${'1x1'}${data.filename}`;
    if (handleFirstMedia) handleFirstMedia(channelName, '1x1', data, imageSlug);
  };

  const handle3by4Media = (data: FileObject) => {
    const imageSlug = `${channelName}${'3x4'}${data.filename}`;
    if (handleFirstMedia) handleFirstMedia(channelName, '3x4', data, imageSlug);
  };

  const handleHzMedia = (data: FileObject) => {
    if (!data.format.includes('video')) return onError('Invalid Format');
    const imageSlug = `${channelName}${'hz'}${data.filename}`;
    if (handleFirstMedia) handleFirstMedia(channelName, 'hz', data, imageSlug);
  };

  const handleRemoveMedia = (index: number, data: ChannelMediaObject, size: string) => {
    debugger;
    removeChannelMedia(index, data, size);
  };

  return (
    <div className="channelMediaWrapper">
      <p>Upload media you want users to view & share on {channelName}</p>
      <div className="flex justify-evenly">
        {/* // ----------1x1 media----------- */}
        <div>
          <div className="imageContent">
            <div className={`imageWrapper${channelName}`}>
              {steps === 2 && (
                <Slider {...settings} arrows>
                  {firstTwitterMedia?.length &&
                    firstTwitterMedia.map((item, i) => (
                      <div key={i} className="carousel-slide">
                        <div className="removeMedia" onClick={() => handleRemoveMedia(i, item, '1x1')}>
                          <TiDelete />
                        </div>
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
              )}
              {steps === 3 && (
                <Slider {...settings} arrows>
                  {firstInstagramMedia?.length &&
                    firstInstagramMedia.map((item, i) => (
                      <div key={i} className="carousel-slide">
                        <div className="removeMedia" onClick={() => handleRemoveMedia(i, item, '1x1')}>
                          <TiDelete />
                        </div>
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
              )}
              {steps === 4 && (
                <Slider {...settings} arrows>
                  {firstFacebookMedia?.length &&
                    firstFacebookMedia.map((item, i) => (
                      <div key={i} className="carousel-slide">
                        <div className="removeMedia" onClick={() => handleRemoveMedia(i, item, '1x1')}>
                          <TiDelete />
                        </div>
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
              )}
              {steps === 5 && (
                <Slider {...settings} arrows>
                  {tiktokMedia?.length &&
                    tiktokMedia.map((item, i) => (
                      <div key={i} className="carousel-slide">
                        <div className="removeMedia" onClick={() => handleRemoveMedia(i, item, '1x1')}>
                          <TiDelete />
                        </div>
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
              )}
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
              onFileSuccess={handleTwitterMedia}
              onFileError={onError}
            />
          </div>
        </div>
        {/* // ----------- 3x4--------- */}
        {secondMobileImage && horizontalVideo && (
          <Fragment>
            <div>
              <div className="image3x4Content">
                <div className={`imageWrapper${channelName}`}>
                  {steps === 2 && (
                    <Slider {...settings}>
                      {secondTwitterMedia?.length &&
                        secondTwitterMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`image3x4${channelName}`} key={i}>
                              {item.media.format.includes('image') ? (
                                <img src={item.media.file} />
                              ) : (
                                <video autoPlay={false} src={item.media.file} controls={true} />
                              )}
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
                  {steps === 3 && (
                    <Slider {...settings}>
                      {secondInstagramMedia?.length &&
                        secondInstagramMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`image3x4${channelName}`} key={i}>
                              {item.media.format.includes('image') ? (
                                <img src={item.media.file} />
                              ) : (
                                <video autoPlay={false} src={item.media.file} controls={true} />
                              )}
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
                  {steps === 4 && (
                    <Slider {...settings} arrows>
                      {secondFacebookMedia?.length &&
                        secondFacebookMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`image3x4${channelName}`} key={i}>
                              {item.media.format.includes('image') ? (
                                <img src={item.media.file} />
                              ) : (
                                <video autoPlay={false} src={item.media.file} controls={true} />
                              )}
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
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
                  onFileSuccess={handle3by4Media}
                  onFileError={onError}
                />
              </div>
            </div>
            {/* // -----------horizontal--------- */}
            <div>
              <div className="imageHzContent">
                <div className={`imageWrapper${channelName}`}>
                  {steps === 2 && (
                    <Slider {...settings} arrows>
                      {thirdTwitterMedia?.length &&
                        thirdTwitterMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`video${channelName}`}>
                              <video autoPlay={false} src={item.media.file} controls={true} />
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
                  {steps === 3 && (
                    <Slider {...settings} arrows>
                      {thirdInstagramMedia?.length &&
                        thirdInstagramMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`video${channelName}`}>
                              <video autoPlay={false} src={item.media.file} controls={true} />
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
                  {steps === 4 && (
                    <Slider {...settings} arrows>
                      {thirdFacebookMedia?.length &&
                        thirdFacebookMedia.map((item, i) => (
                          <div key={i} className="carousel-slide">
                            <div className="removeMedia">
                              <TiDelete />
                            </div>
                            <div className={`video${channelName}`}>
                              <video autoPlay={false} src={item.media.file} controls={true} />
                            </div>
                          </div>
                        ))}
                    </Slider>
                  )}
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
                  onFileSuccess={handleHzMedia}
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
