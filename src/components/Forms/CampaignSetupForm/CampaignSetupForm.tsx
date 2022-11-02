import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, FormControlLabel, Checkbox } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorObject, FileObject, ProfileTypes } from '../../../types';
import CampaignTypeInput from './CampaignTypeInput';
import CampaignBudgetTypeInput from './CampaignBudgetTypeInput';
import Actions from '../../NewCampaign/Actions';
import { resetCampaign, updateCampaign } from '../../../store/actions/campaign';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import CustomSelect from '../../CustomSelect/CustomSelect';
import CustomInput from '../../CustomInput';
import { showErrorAlert } from '../../../store/actions/alerts';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import SocialMediaTypeInput from './SocialMediaTypeInput';
import FileUpload from '../../FileUpload';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiURI } from '../../../clients/raiinmaker-api';
import { APPROVED, RAIINMAKER } from '../../../helpers/constants';
import './campaignSetupForm.scss';
import ContentSteps from './ContentSteps';

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
    if (parseFloat(coiinBudget) <= 0 && steps >= 3) return dispatch(showErrorAlert('Please add campaign budget'));
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

  const onFileSuccess = (data: FileObject) => {
    setRaffleImage(data);
  };

  const onFileError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!socialMediaType || socialMediaType.length === 0) {
      dispatch(showErrorAlert('Please select atleast one social channel'));
      return (validated = false);
    }
    if (!campaignType && steps >= 3) {
      dispatch(showErrorAlert('Please select type of campaign'));
      return (validated = false);
    }
    if (!budgetType && steps > 3) {
      dispatch(showErrorAlert('Please select budget type of your campaign campaign'));
      return (validated = false);
    }
    if (budgetType == 'crypto') {
      if (!cryptoSymbol) {
        setErrors((prev) => ({ ...prev, cryptoSymbol: true }));
        return (validated = false);
      }
      if (!parseFloat(coiinBudget)) {
        setErrors((prev) => ({ ...prev, coiinBudget: true }));
        return (validated = false);
      }
    } else if (budgetType === 'raffle') {
      if (!rafflePrizeName) {
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
    <Box className="campaignSetupFormWrapper">
      <ContentSteps
        isGlobal={isGlobal}
        campaignType={campaignType}
        handleCampaignType={handleCampaignType}
        handleSocialMediaType={handleSocialMediaType}
        socialMediaType={socialMediaType}
        steps={steps}
      />
      {/* <Fade triggerOnce>
        <SocialMediaTypeInput
          selectAllByDefault={isGlobal}
          socialMediaType={socialMediaType}
          handleChange={handleSocialMediaType}
        />
      </Fade>
      <Fade triggerOnce>
        <CampaignTypeInput campaignType={campaignType} handleChange={handleCampaignType} />
      </Fade>

      {campaignType && (
        <Fade triggerOnce>
          <Box className="campaignBudgets">
            <CampaignBudgetTypeInput budgetType={budgetType} company={company} handleChange={handleBudgetType} />
            {budgetType && (
              <Box className="selectFieldsWrapper">
                {budgetType == 'crypto' && (
                  <Fade triggerOnce>
                    <Box className="selectField">
                      <Box className="selectFieldOutline">
                        <CustomSelect
                          required={true}
                          value={cryptoSymbol}
                          onChange={(event: React.ChangeEvent<any>) => {
                            setCryptoSymbol(event.target.value);
                            setCoiinBudget('');
                            updateErrors('cryptoSymbol', event.target.value);
                          }}
                          label="Select Token"
                          options={coiinOptions}
                          upperCaseOptions={true}
                          error={errors['cryptoSymbol']}
                          disabled={Boolean(campaign.id)}
                        />
                      </Box>
                      <Box className="selectFieldOutline">
                        <CustomInput
                          required={true}
                          value={coiinBudget}
                          onChange={handleCoiinBudgetChange}
                          placeholder="100"
                          label="Campaign Budget"
                          type="number"
                          error={errors['coiinBudget']}
                          disabled={Boolean(campaign.id)}
                        />
                      </Box>
                      <Box className="checkboxWrapper">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isGlobal}
                              className="checkbox"
                              name="Brand Agreement"
                              onChange={(e, checked) => {
                                setIsGlobal(checked);
                              }}
                            />
                          }
                          label="Is Global Campaign"
                        />
                      </Box>
                    </Box>
                  </Fade>
                )}

                {budgetType === 'raffle' && (
                  <Box className="raffleInputFieldWrapper">
                    <Box className="raffleInputPosition">
                      <Box className="inputFieldWrapper">
                        <CustomInput
                          required={true}
                          value={rafflePrizeName}
                          placeholder="Raffle Campaign Prize"
                          label="Raffle Prize Name"
                          type="text"
                          onChange={(event: React.ChangeEvent<any>) => {
                            setRafflePrizeName(event.target.value);
                            updateErrors('rafflePrizeName', event.target.value);
                          }}
                          error={errors['rafflePrizeName']}
                        />
                      </Box>
                      <Box className="inputFieldWrapper">
                        <CustomInput
                          required={true}
                          value={rafflePrizeLink}
                          placeholder="Raffle Affiliate Link"
                          label="Raffle Affiliate Link (optional)"
                          type="text"
                          onChange={(event: React.ChangeEvent<any>) => {
                            setRafflePrizeLink(event.target.value);
                            updateErrors('rafflePrizeLink', event.target.value);
                          }}
                          error={errors['rafflePrizeLink']}
                        />
                      </Box>
                      <Box className="checkboxWrapper">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isGlobal}
                              className="checkbox"
                              name="Brand Agreement"
                              onChange={(e, checked) => {
                                setIsGlobal(checked);
                              }}
                            />
                          }
                          label="Is Global Campaign"
                        />
                      </Box>
                    </Box>
                    <Box className="uploadloadFileWrapper">
                      <FileUpload
                        value={raffleImage}
                        label="Upload Raffle Image"
                        onFileSuccess={onFileSuccess}
                        onFileError={onFileError}
                        mediaType="raffle"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Fade>
      )} */}
      <Actions
        activeStep={activeStep}
        firstStep={firstStep}
        finalStep={finalStep}
        handleBack={handleBack}
        handleNext={next}
      />
    </Box>
  );
};

export default CampaignSetupForm;
