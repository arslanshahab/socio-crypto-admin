import React, { FC, Fragment } from 'react';
import './walkthrough.scss';
import CustomButton from '../../components/CustomButton';
import awarenessImg from '../../assets/png/campaignPrioritize/brandAwareness.png';
import converisonImg from '../../assets/png/campaignPrioritize/conversion.png';
import engagementImg from '../../assets/png/campaignPrioritize/socialEngagement.png';
import viewsImg from '../../assets/png/campaignPrioritize/videoViews.png';
import twitterImg from '../../assets/png/socialIcons/Twitter-logo 6.png';
import instagramImg from '../../assets/png/socialIcons/Instagram-Icon 8.png';
import facebookImg from '../../assets/png/socialIcons/Facebook_app 3.png';
import tiktokImg from '../../assets/png/socialIcons/TikTok-icon-glyph 5.png';
import campaignMediaIcon from '../../assets/png/campaignPrioritize/campaignImageIcon.png';
import campaignInfoIcon from '../../assets/png/campaignPrioritize/campaignInfoIcon.png';

const prioritizeImages = [viewsImg, awarenessImg, engagementImg, converisonImg];
const socialImages = [twitterImg, instagramImg, tiktokImg, facebookImg];

interface WalkthroughIProps {
  title: string;
  description: string;
  primaryImage: string;
  handleNext: () => void;
  steps: number;
  slug?: string;
}
const Walkthrough: FC<WalkthroughIProps> = ({ title, description, primaryImage, handleNext, steps, slug }) => {
  return (
    <div className="walkthorughWrapper">
      <h1>{title}</h1>
      <div className="walkthroughContent">
        {steps === 3 || steps === 4 ? (
          <Fragment>
            {steps === 3 && (
              <div className="socialIconsWrapper">
                <div className="socialMediaScreen">
                  <div className="imagesGrid">
                    {prioritizeImages?.map((x, i) => (
                      <div key={i} className="imageWrapper">
                        <img src={x} />
                      </div>
                    ))}
                  </div>

                  <div className="imagesGrid">
                    {socialImages?.map((x, i) => (
                      <div key={i} className="imageWrapper">
                        <img src={x} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {steps === 4 && (
              <div className="mediaGrid">
                <div className="imageWrapper">
                  <img src={campaignInfoIcon} />
                </div>
                <div className="imageWrapper">
                  <img src={campaignMediaIcon} />
                </div>
              </div>
            )}
          </Fragment>
        ) : (
          <div className="primaryImageWrapper">
            <div className={slug ? 'imageWrapperMobile' : 'imageWrapper'}>
              <img src={primaryImage} />
            </div>
          </div>
        )}
        <div className="text">
          <p>{description}</p>
        </div>
      </div>

      <div className="buttonWrapper">
        <CustomButton className="nextButton" onClick={handleNext}>
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default Walkthrough;
