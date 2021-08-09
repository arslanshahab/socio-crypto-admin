import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';
import icon from '../../../assets/svg/camera.svg';
import { useQuery } from '@apollo/client';
import { GetFundingWalletResponse } from '../../../types';
import { GET_FUNDING_WALLET } from '../../../operations/queries/fundingWallet';
import { capitalize } from '../../../helpers/formatter';
import { handleImage } from '../../../helpers/utils';
import { useHistory } from 'react-router';
import CampaignTypeInput from './CampaignTypeInput';
import CampaignBudgetTypeInput from './CampaignBudgetTypeInput';
import Actions from '../../NewCampaign/Actions';
import { resetCampaign, updateCampaign } from '../../../store/actions/campaign';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';

interface Props {
  company: string;
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

interface Crypto {
  type: string;
  id: string;
  balance: number;
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
  const history = useHistory();
  const campaign = useStoreCampaignSelector();
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType);
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType);
  const [cryptoSymbol, setCryptoSymbol] = useState(campaign.config.cryptoSymbol);
  const [coiinBudget, setCoiinBudget] = useState(campaign.config.coiinBudget);
  const [rafflePrizeName, setRafflePrizeName] = useState(campaign.config.rafflePrizeName);
  const [rafflePrizeLink, setRafflePrizeLink] = useState(campaign.config.rafflePrizeAffiliateLink);

  const hasValue = (token: Crypto) => {
    return token.balance > 0;
  };

  const handleCampaignType = (type: string) => {
    setCampaignType(type);
  };

  const handleBudgetType = (type: string) => {
    setBudgetType(type);
  };

  const handleSymbolChange = (e: React.ChangeEvent<any>) => {
    if (e.target.value !== 'register') {
      setCryptoSymbol(e.target.value);
    }
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
      }
    }
  };

  const next = () => {
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
        }),
      },
    };
    console.log(augmentedCampaign);
    dispatch(updateCampaign(augmentedCampaign));
    handleNext();
  };

  return (
    <Box className="w-full px-20">
      <Fade triggerOnce>
        <CampaignTypeInput campaignType={campaignType} handleChange={handleCampaignType} />
      </Fade>

      {campaignType && (
        <Fade triggerOnce>
          <Box className="w-full mt-16">
            <CampaignBudgetTypeInput budgetType={budgetType} company={company} handleChange={handleBudgetType} />
            {budgetType && (
              <Box className="w-full mt-10">
                {budgetType == 'crypto' && (
                  <Fade triggerOnce>
                    <Box className="flex flex-row justify-start w-full">
                      <Box className="w-2/6 box-border pr-4">
                        <FormControl variant={'outlined'} fullWidth>
                          <InputLabel>Select Token</InputLabel>
                          <Select value={cryptoSymbol} onChange={handleSymbolChange}>
                            {loading ? (
                              <div />
                            ) : data && data.getFundingWallet.currency.filter(hasValue).length ? (
                              data.getFundingWallet.currency.filter(hasValue).map((crypto, index) => (
                                <MenuItem alignItems="flex-start" value={crypto.type.toLowerCase()} key={index}>
                                  {capitalize(crypto.type.toUpperCase())}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem
                                value="register"
                                onClick={() => {
                                  dispatch(resetCampaign());
                                  history.push('/dashboard/paymentsAccount');
                                }}
                              >
                                No Crypto Currency Found - Register Crypto
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className="w-2/6 box-border pr-4">
                        <TextField
                          label="Campaign Budget"
                          name="budget"
                          placeholder={'100'}
                          fullWidth
                          variant="outlined"
                          type="number"
                          value={coiinBudget}
                          onChange={handleCoiinBudgetChange}
                        />
                      </Box>
                    </Box>
                  </Fade>
                )}

                {budgetType === 'raffle' && (
                  <Box className="flex flex-row justify-between w-full">
                    <Box className="w/-2/6">
                      <TextField
                        label="Raffle Prize Name"
                        placeholder={'Raffle Campaign Prize'}
                        fullWidth
                        variant="outlined"
                        margin={'normal'}
                        type="text"
                        value={rafflePrizeName}
                        onChange={(event) => {
                          setRafflePrizeName(event.target.value);
                        }}
                      />
                      <TextField
                        label={'Raffle Affiliate Link (optional)'}
                        name={''}
                        placeholder={'Raffle Affiliate Link'}
                        fullWidth
                        variant="outlined"
                        margin={'normal'}
                        type="text"
                        value={rafflePrizeLink}
                        onChange={(event) => {
                          setRafflePrizeLink(event.target.value);
                        }}
                      />
                    </Box>
                    <Box className="image-upload-container w-1/6">
                      <label htmlFor="single" className="cursor-pointer">
                        <div>
                          {campaign.config.raffleImage?.file ? (
                            <div className="w-48 h-32">
                              <img src={URL.createObjectURL(campaign.config.raffleImage.file)} alt="Raffle" />
                            </div>
                          ) : (
                            <Box className="flex flex-col justify-center items-center">
                              <img className="w-28 h-28 mb-2" src={icon} color="#3B5998" />
                            </Box>
                          )}
                        </div>
                        <p>Upload Raffle Image</p>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        id="single"
                        onChange={(e) => handleImage(e, dispatch, 'raffle')}
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
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CampaignSetupForm;
