import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';
import icon from '../../../assets/svg/camera.svg';
import { useQuery } from '@apollo/client';
import { ErrorObject, FileObject, GetFundingWalletResponse } from '../../../types';
import { GET_FUNDING_WALLET } from '../../../operations/queries/fundingWallet';
import { handleImage } from '../../../helpers/fileHandler';
import { useHistory } from 'react-router';
import CampaignTypeInput from './CampaignTypeInput';
import CampaignBudgetTypeInput from './CampaignBudgetTypeInput';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import CustomSelect from '../../CustomSelect/CustomSelect';
import CustomInput from '../../CustomInput';
import { showErrorAlert } from '../../../store/actions/alerts';

interface Props {
  company: string;
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const CampaignSetupForm: React.FC<Props> = ({
  company,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const dispatch = useDispatch();
  const { loading, data } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET);
  const campaign = useStoreCampaignSelector();
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType);
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType);
  const [cryptoSymbol, setCryptoSymbol] = useState(campaign.config.cryptoSymbol);
  const [coiinBudget, setCoiinBudget] = useState(campaign.config.coiinBudget);
  const [rafflePrizeName, setRafflePrizeName] = useState(campaign.config.rafflePrizeName);
  const [rafflePrizeLink, setRafflePrizeLink] = useState(campaign.config.rafflePrizeAffiliateLink);
  const [raffleImage, setRaffleImage] = useState(campaign.config.raffleImage);
  const [errors, setErrors] = useState<ErrorObject>({});
  const coiinOptions =
    !loading && data && data.getFundingWallet
      ? data.getFundingWallet.currency.filter((token) => token.balance > 0).map((item) => item.type.toLowerCase())
      : [];

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
        if (parseInt(value) > token.balance) {
          value = token.balance.toString();
        }
        setCoiinBudget(value);
        updateErrors('coiinBudget', value);
      }
    }
  };

  const next = () => {
    if (validateInputs()) {
      const currencyObject =
        data && data.getFundingWallet
          ? data.getFundingWallet.currency.find((item) => item.type.toLowerCase() === cryptoSymbol)
          : null;
      const symbolId: string = currencyObject ? currencyObject.id : '';
      const augmentedCampaign = {
        ...campaign,
        cryptoId: symbolId,
        config: {
          ...campaign.config,
          coiinBudget,
          campaignType,
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
      if (!parseInt(coiinBudget)) {
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

  return (
    <Box className="w-full px-20">
      {/* <Box
        onClick={() => {
          dispatch(resetCampaign());
          history.push('/dashboard/paymentsAccount');
        }}
      >
        No Crypto Currency Found - Register Crypto
      </Box> */}
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
                          value={cryptoSymbol}
                          onChange={(event: React.ChangeEvent<any>) => {
                            setCryptoSymbol(event.target.value);
                            updateErrors('cryptoSymbol', event.target.value);
                          }}
                          label="Select Token"
                          options={coiinOptions}
                          upperCaseOptions={true}
                          error={errors['cryptoSymbol']}
                        />
                      </Box>
                      <Box className="w-2/6 box-border pr-4">
                        <CustomInput
                          value={coiinBudget}
                          onChange={handleCoiinBudgetChange}
                          placeholder="100"
                          label="CampaignBudget"
                          type="number"
                          error={errors['coiinBudget']}
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
                      <label htmlFor="single" className="cursor-pointer">
                        <Box className="flex flex-col justify-center items-center h-44 w-full bg-gray-100 rounded-lg">
                          {raffleImage?.file ? (
                            <img
                              src={raffleImage.file}
                              alt="Raffle"
                              className="w-full h-44 mb-2 rounded-md object-cover"
                            />
                          ) : (
                            <>
                              <img className="w-24" src={icon} color="#3B5998" />
                            </>
                          )}
                        </Box>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        id="single"
                        onChange={(e) => handleImage(e, 'raffle', onFileSuccess, onFileError)}
                      />
                      <label>
                        <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 rounded-b-lg">
                          <p className="text-center text-gray-600 text-lg mt-1 pb-1">Upload Raffle Image</p>
                        </Box>
                      </label>
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
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CampaignSetupForm;
