import React, { Fragment, useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorObject, ProfileTypes } from '../../../types';
import Actions from '../../NewCampaign/Actions';
import { resetCampaign, updateCampaign } from '../../../store/actions/campaign';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { showErrorAlert } from '../../../store/actions/alerts';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURI } from '../../../clients/raiinmaker-api';
import { APPROVED, RAIINMAKER } from '../../../helpers/constants';
import './campaignSetupForm.scss';
import ContentSteps from './ContentSteps';
import WalkthroughSteps from '../../../componentsv2/Walkthrough/WalkthroughSteps';
import { walkthroughAction } from '../../../store/actions/profile';

interface Props {
  company: string;
}

type FundingWalletTypes = { type: string; symbolImageUrl: string; balance: number; id: string; network: string };

const CampaignSetupForm: React.FC<Props & ActionsProps> = ({
  company,
  activeStep,
  handleBack,
  handleNext,
  firstStep,
  finalStep,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const { walkthrough } = useSelector((state: { walkthrough: { status: boolean } }) => state);
  const campaign = useStoreCampaignSelector();
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType);
  const [socialMediaType, setSocialMediaType] = useState(campaign.config.socialMediaType);
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType);
  const [cryptoSymbol, setCryptoSymbol] = useState(campaign.config.cryptoSymbol);
  const [coiinBudget, setCoiinBudget] = useState(campaign.config.coiinBudget);
  const [rafflePrizeName, setRafflePrizeName] = useState(campaign.config.rafflePrizeName);
  const [rafflePrizeLink, setRafflePrizeLink] = useState(campaign.config.rafflePrizeAffiliateLink);
  const [raffleImage, setRaffleImage] = useState(campaign.config.raffleImage);
  const [isGlobal, setIsGlobal] = useState(campaign.config.isGlobal);
  const [errors, setErrors] = useState<ErrorObject>({});
  const [fundingWallet, setFundingWallet] = useState<FundingWalletTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState<number>(1);
  const [walkthroughStep, setWalkthroughStep] = useState<number>(0);
  //   const totalSteps = stepsList.length - 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios(`${apiURI}/v1/funding-wallet`, { withCredentials: true });
      setFundingWallet(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const coiinOptions = !isLoading && fundingWallet ? fundingWallet.map((item) => `${item.type}-${item.network}`) : [];
  const handleSocialMediaType = (type: string[]) => {
    setSocialMediaType(type);
  };

  const handleCampaignType = (type: string) => {
    setCampaignType(type);
  };

  const handleBudgetType = (type: string) => {
    setBudgetType(type);
  };

  const handleCoiinBudgetChange = (event: React.ChangeEvent<any>) => {
    if (event.target.value < 0) return;
    if (fundingWallet) {
      const token = fundingWallet.find((item) => `${item.type}-${item.network}` === cryptoSymbol);
      if (token) {
        let value = event.target.value;
        if (parseFloat(value) > token.balance) {
          value = token.balance.toString();
        }
        setCoiinBudget(value);
        updateErrors('coiinBudget', value);
      }
    }
  };

  const next = () => {
    // if (parseFloat(coiinBudget) <= 0 && steps >= 3) return dispatch(showErrorAlert('Please add campaign budget'));
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        config: {
          ...campaign.config,
          coiinBudget,
          campaignType,
          socialMediaType,
          budgetType,
          cryptoSymbol,
          isGlobal,
          ...(budgetType === 'raffle' && {
            rafflePrizeName,
            rafflePrizeAffiliateLink: rafflePrizeLink,
            raffleImage,
          }),
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      if (steps >= 3) handleNext();
      else {
        setSteps(steps + 1);
      }
    }
  };

  const back = () => {
    if (steps > 3) handleBack();
    else {
      setSteps(steps - 1);
    }
  };

  //   const onFileSuccess = (data: FileObject) => {
  //     setRaffleImage(data);
  //   };

  //   const onFileError = (msg: string) => {
  //     dispatch(showErrorAlert(msg));
  //   };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!socialMediaType || socialMediaType.length === 0) {
      dispatch(showErrorAlert('Please select atleast one social channel'));
      return (validated = false);
    }
    if (!campaignType && steps >= 2) {
      dispatch(showErrorAlert('Please select type of campaign'));
      return (validated = false);
    }
    if (!budgetType && steps > 3) {
      dispatch(showErrorAlert('Please select budget type of your campaign campaign'));
      return (validated = false);
    }
    if (budgetType == 'crypto') {
      if (!cryptoSymbol && steps >= 3) {
        setErrors((prev) => ({ ...prev, cryptoSymbol: true }));
        return (validated = false);
      }
      if (!parseFloat(coiinBudget) || (parseFloat(coiinBudget) <= 0 && steps > 2)) {
        setErrors((prev) => ({ ...prev, coiinBudget: true }));
        return (validated = false);
      }
    } else if (budgetType === 'raffle') {
      if (!rafflePrizeName) {
        dispatch(showErrorAlert('Please add campaign budget'));
        setErrors((prev) => ({ ...prev, rafflePrizeName: true }));
        return (validated = false);
      }
      if (!rafflePrizeLink) {
        setErrors((prev) => ({ ...prev, rafflePrizeLink: true }));
        return (validated = false);
      }
    }
    return validated;
  };

  const updateErrors = (name: string, data: any) => {
    const key = name;
    const value = data;
    const newErrors = { ...errors };
    if (!value || value.length === 0) {
      newErrors[key] = true;
    } else {
      newErrors[key] = false;
    }
    setErrors(newErrors);
  };

  const handleSelectToken = (event: React.ChangeEvent<any>) => {
    setCryptoSymbol(event.target.value);
    setCoiinBudget('');
    updateErrors('cryptoSymbol', event.target.value);
  };

  const handleIsGlobal = () => {
    setIsGlobal(true);
  };

  const handleWalkthroughStep = (step: number) => {
    setWalkthroughStep(step);
    if (profile.email && walkthroughStep > 3) {
      dispatch(walkthroughAction(true));
    }
  };

  if (isLoading) {
    return (
      <Box className="setupFormMessage">
        <CircularProgress size={30} color="primary" className="mt-3" />
      </Box>
    );
  }

  if (!fundingWallet?.length) {
    return (
      <Box className="setupFormMessage">
        <p>
          No cryptocurrency found - Please purchase Crypto{' '}
          <span
            onClick={() => {
              dispatch(resetCampaign());
              history.push('/dashboard/paymentsAccount', true);
            }}
          >
            here
          </span>
        </p>
      </Box>
    );
  }

  if (profile.verifyStatus !== APPROVED && profile.company !== RAIINMAKER) {
    return (
      <Box className="setupFormMessage">
        <p>
          Before creating a new campaign, please verify your KYC{' '}
          <span
            onClick={() => {
              dispatch(resetCampaign());
              history.push('/dashboard/profile');
            }}
          >
            here
          </span>
        </p>
      </Box>
    );
  }

  return (
    <Fragment>
      {!walkthrough.status ? (
        <WalkthroughSteps callback={handleWalkthroughStep} />
      ) : (
        <Box className="campaignSetupFormWrapper">
          <ContentSteps
            isGlobal={isGlobal}
            campaignType={campaignType}
            handleCampaignType={handleCampaignType}
            handleSocialMediaType={handleSocialMediaType}
            socialMediaType={socialMediaType}
            steps={steps}
            budgetType={budgetType}
            campaign={campaign}
            coiinBudget={coiinBudget}
            coiinOptions={coiinOptions}
            company={company}
            cryptoSymbol={cryptoSymbol}
            errors={errors}
            handleBudgetType={handleBudgetType}
            handleCoiinBudgetChange={handleCoiinBudgetChange}
            handleSelectToken={handleSelectToken}
            handleIsGlobal={handleIsGlobal}
          />

          <Actions
            activeStep={activeStep}
            firstStep={firstStep}
            finalStep={finalStep}
            handleBack={back}
            handleNext={next}
            subStep={steps}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default CampaignSetupForm;
