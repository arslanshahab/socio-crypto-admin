import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../../../redux/slices/campaign';
import icon from '../../../assets/svg/camera.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { useQuery } from '@apollo/client';
import { GetFundingWalletResponse } from '../../../types';
import { GET_FUNDING_WALLET } from '../../../operations/queries/fundingWallet';
import { capitalize } from '../../../helpers/formatter';
import { handleImage } from '../../../helpers/utils';
import { useHistory } from 'react-router';
import CampaignTypeInput from './CampaignTypeInput';
import CampaignBudgetTypeInput from './CampaignBudgetTypeInput';
import Actions from '../../NewCampaign/Actions';

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
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [campaignType, setCampaignType] = useState(
    campaign.config.campaignType ? campaign.config.campaignType.toString() : '',
  );
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType ? campaign.config.budgetType.toString() : '');

  const handleCampaignChange = (key: string, value: any) => {
    const cat = key === 'cryptoId' ? 'info' : 'config';
    dispatch(updateCampaignState({ cat, key: key, val: value }));
  };

  const hasValue = (token: Crypto) => {
    return token.balance > 0;
  };

  const handleCampaignType = (type: string) => {
    setCampaignType(type);
    dispatch(updateCampaignState({ cat: 'config', key: 'campaignType', val: type }));
  };

  const handleBudgetType = (type: string) => {
    setBudgetType(type);
    handleCampaignChange('budgetType', type);
  };

  console.log(data);

  return (
    <Box className="w-full px-28">
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
                    <Box className="flex flex-col justify-start w-2/6">
                      <FormControl className="w-2/5" variant={'outlined'} fullWidth>
                        <InputLabel>Select Token</InputLabel>
                        <Select value={campaign.config.cryptoSymbol?.toUpperCase()}>
                          {loading ? (
                            <div />
                          ) : data && data.getFundingWallet.currency.filter(hasValue).length ? (
                            data.getFundingWallet.currency.filter(hasValue).map((crypto, index) => {
                              return (
                                <MenuItem
                                  alignItems="flex-start"
                                  value={crypto.type.toUpperCase()}
                                  onClick={() => {
                                    handleCampaignChange('cryptoSymbol', crypto.type);
                                    handleCampaignChange('cryptoId', crypto.id);
                                  }}
                                  key={index}
                                >
                                  {capitalize(crypto.type.toUpperCase())}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem
                              value="Register Token"
                              onClick={() => {
                                dispatch(updateCampaignState({ cat: 'reset', key: 'reset', val: 'reset' }));
                                history.push('/dashboard/paymentsAccount');
                              }}
                            >
                              No Crypto Currency Found - Register Crypto
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      <TextField
                        label="Campaign Budget"
                        name="budget"
                        placeholder={'100'}
                        fullWidth
                        variant="outlined"
                        margin={'normal'}
                        type="number"
                        value={campaign.config.coiinBudget}
                        onChange={(event) => {
                          if (data && data.getFundingWallet) {
                            const token = data.getFundingWallet.currency.find(
                              (item) => item.type === campaign.config.cryptoSymbol,
                            );
                            if (token) {
                              if (parseInt(event.target.value) > token.balance) {
                                event.target.value = token.balance.toString();
                              }
                            }
                          }
                          handleCampaignChange('coiinBudget', event.target.value as string);
                          dispatch(
                            updateCampaignState({
                              cat: 'algoTiers',
                              tier: '3',
                              key: 'totalCoiins',
                              val: event.target.value,
                            }),
                          );
                        }}
                      />
                    </Box>
                  </Fade>
                )}

                {budgetType === 'raffle' && (
                  <Box className="flex flex-row justify-between w-full">
                    <Box className="w/-2/6">
                      <TextField
                        label={'Raffle Prize Name'}
                        name={''}
                        placeholder={'Raffle Campaign Prize'}
                        fullWidth
                        variant="outlined"
                        margin={'normal'}
                        type="text"
                        onChange={(event) => {
                          handleCampaignChange('rafflePrizeName', event.target.value as string);
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
                        onChange={(event) => {
                          handleCampaignChange('rafflePrizeAffiliateLink', event.target.value as string);
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

                {budgetType !== 'crypto' && budgetType !== 'raffle' && (
                  <TextField
                    label={'Campaign Budget (USD)'}
                    name={'budget'}
                    placeholder={'Campaign Budget (USD)'}
                    fullWidth
                    variant="outlined"
                    margin={'normal'}
                    type="number"
                    onChange={(event) => {
                      handleCampaignChange('usdBudget', event.target.value as string);
                    }}
                  />
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
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default CampaignSetupForm;
