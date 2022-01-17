import React, { useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { ErrorObject, FileObject, GetFundingWalletResponse } from '../../../types';
import { GET_FUNDING_WALLET } from '../../../operations/queries/fundingWallet';
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
import CustomButton from '../../CustomButton/CustomButton';

interface Props {
  company: string;
}

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
  const { loading, data } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET, { fetchPolicy: 'network-only' });
  const campaign = useStoreCampaignSelector();
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType);
  const [socialMediaType, setSocialMediaType] = useState(campaign.config.socialMediaType);
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType);
  const [cryptoSymbol, setCryptoSymbol] = useState(campaign.config.cryptoSymbol);
  const [coiinBudget, setCoiinBudget] = useState(campaign.config.coiinBudget);
  const [rafflePrizeName, setRafflePrizeName] = useState(campaign.config.rafflePrizeName);
  const [rafflePrizeLink, setRafflePrizeLink] = useState(campaign.config.rafflePrizeAffiliateLink);
  const [raffleImage, setRaffleImage] = useState(campaign.config.raffleImage);
  const [errors, setErrors] = useState<ErrorObject>({});
  const coiinOptions =
    !loading && data && data.getFundingWallet
      ? data.getFundingWallet.currency.map((item) => item.type.toUpperCase())
      : [];
  console.log(coiinOptions);
  console.log(cryptoSymbol);
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
    if (data && data.getFundingWallet) {
      const token = data.getFundingWallet.currency.find(
        (item) => item.type.toLowerCase() === cryptoSymbol.toLowerCase(),
      );
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
          ...(budgetType === 'raffle' && {
            rafflePrizeName,
            rafflePrizeAffiliateLink: rafflePrizeLink,
            raffleImage,
          }),
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
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
    if (!campaignType) {
      dispatch(showErrorAlert('Please select type of campaign'));
      return (validated = false);
    }
    if (!budgetType) {
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

  if (!data || loading) {
    return (
      <Box className="p-10 w-full flex flex-col justify-center items-center">
        <CircularProgress size={30} color="primary" className="mt-3" />
      </Box>
    );
  }

  if (data?.getFundingWallet?.currency?.length) {
    return (
      <Box className="p-10 w-full flex flex-col justify-center items-center">
        <p>
          No Crypto-Currency found - Please register Crypto{' '}
          <span
            className="cursor-pointer underline text-blue-800 font-semibold	"
            onClick={() => {
              dispatch(resetCampaign());
              history.push('/dashboard/paymentsAccount');
            }}
          >
            here
          </span>
        </p>
      </Box>
    );
  }

  return (
    <Box className="w-full px-28">
      <Fade triggerOnce>
        <SocialMediaTypeInput socialMediaType={socialMediaType} handleChange={handleSocialMediaType} />
      </Fade>
      <Fade triggerOnce>
        <CampaignTypeInput campaignType={campaignType} handleChange={handleCampaignType} />
      </Fade>

      {campaignType && (
        <Fade triggerOnce>
          <Box className="w-full mt-10">
            <CampaignBudgetTypeInput budgetType={budgetType} company={company} handleChange={handleBudgetType} />
            {budgetType && (
              <Box className="w-full mt-10">
                {budgetType == 'crypto' && (
                  <Fade triggerOnce>
                    <Box className="flex flex-row justify-start w-full">
                      <Box className="w-2/6 box-border pr-4">
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
                      <Box className="w-2/6 box-border pr-4">
                        <CustomInput
                          required={true}
                          value={coiinBudget}
                          onChange={handleCoiinBudgetChange}
                          placeholder="100"
                          label="CampaignBudget"
                          type="number"
                          error={errors['coiinBudget']}
                          disabled={Boolean(campaign.id)}
                        />
                      </Box>
                    </Box>
                  </Fade>
                )}

                {budgetType === 'raffle' && (
                  <Box className="flex flex-row justify-between w-full">
                    <Box className="w-2/6 pr-3">
                      <Box className="mb-4 w-full">
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
                      <Box className="w-full">
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
                    </Box>
                    <Box className="flex flex-col justify-start w-2/6 pl-3">
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
      )}
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
