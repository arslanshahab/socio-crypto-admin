import React, { FC, useState } from 'react';
import Walkthrough from './index';
import raiinmakerImg from '../../assets/png/rainmaker_img.png';
import cryptoImg from '../../assets/png/cryptoImage.png';
import cartImg from '../../assets/png/cart.png';

interface WalkthroughIProps {
  callback?: (step: number) => void;
}

const WalkthroughSteps: FC<WalkthroughIProps> = ({ callback }) => {
  const [steps, setSteps] = useState(1);

  const handleNext = () => {
    setSteps((pre) => pre + 1);
    callback && callback(steps);
  };

  switch (steps) {
    case 1:
      return (
        <Walkthrough
          key={1}
          title={'Welcome to the Raiinmaker Campaign Portal!'}
          description={'Here Are Just A Few Notes Before Getting Started'}
          primaryImage={raiinmakerImg}
          handleNext={handleNext}
          steps={steps}
          slug="Mobile"
        />
      );
    case 2:
      return (
        <Walkthrough
          key={2}
          title={'Welcome to the Raiinmaker Campaign Portal!'}
          description={
            'Campaigns are funded through our primary $Coiin Currency, it is how the Raiinmaker Community is rewarded. Creators also have the ability to reward participants with their own ERC20 coins, all options will be available at the end of the  Campaign Creation. If you would like to set up your wallet now click here.'
          }
          primaryImage={cryptoImg}
          handleNext={handleNext}
          steps={steps}
        />
      );
    case 3:
      return (
        <Walkthrough
          key={3}
          title={'Welcome to the Raiinmaker Campaign Portal!'}
          description={
            'the first step will be to determine the purpose, social media platforms your brand will be promoting on, and the budget of the Campaign.'
          }
          primaryImage={''}
          handleNext={handleNext}
          steps={steps}
        />
      );
    case 4:
      return (
        <Walkthrough
          key={4}
          title={'Welcome to the Raiinmaker Campaign Portal!'}
          description={
            'Next, we’ll ask for information, to help promote the campaign across the social channels, as well as Media Assets that will be posted.'
          }
          handleNext={handleNext}
          primaryImage={''}
          steps={steps}
        />
      );
    default:
      return (
        <Walkthrough
          key={2}
          title={'Welcome to the Raiinmaker Campaign Portal!'}
          description={
            'the first step will be to determine the purpose, social media platforms your brand will be promoting on, and the budget of the Campaign.'
          }
          primaryImage={cartImg}
          handleNext={handleNext}
          steps={steps}
        />
      );
  }
};

export default WalkthroughSteps;
