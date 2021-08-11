import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { FaTicketAlt, FaFile } from 'react-icons/fa';
import coiin_yellow from '../../assets/svg/icon_coiin_yellow copy.svg';
import coiin_black from '../../assets/svg/icon_coiin_black copy.svg';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { ReactSVG } from 'react-svg';
import icon from '../../assets/svg/camera.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { useQuery } from '@apollo/client';
import { FileObject, GetFundingWalletResponse } from '../../types';
import { GET_FUNDING_WALLET } from '../../operations/queries/fundingWallet';
import { capitalize } from '../../helpers/formatter';
import { handleImage } from '../../helpers/fileHandler';
import { useHistory } from 'react-router';

interface Props {
  company: string;
}

interface Crypto {
  type: string;
  id: string;
  balance: number;
}

export const SetupCampaign: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { loading, data } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET);
  const history = useHistory();
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType ? campaign.config.campaignType : '');
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType ? campaign.config.budgetType : '');
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

  const onSuccess = (data: FileObject) => {
    console.log(data);
  };

  const onError = (msg: string) => {
    console.log(msg);
  };

  return (
    <Box className="w-full">
      <Fade triggerOnce>
        <Box className="w-full mt-16">
          <p className="margin-bottom center-text setup-campaign-question">What will this campaign prioritize?</p>
          <Box className="flex flex-row justify-between">
            <Box
              onClick={() => handleCampaignType('video-views')}
              className={`flex flex-row justify-center items-center rounded-lg w-72 h-32 bg-gray-200 spacing-2 ${
                campaignType === 'video-views' ? 'bg-blue-800 text-white' : ''
              }`}
            >
              <p>Video Views</p>
            </Box>
            <Box
              onClick={() => handleCampaignType('brand-awareness')}
              className={`flex flex-row justify-center items-center rounded-lg w-1/4 h-32 bg-gray-200 spacing-2 ${
                campaignType === 'brand-awareness' ? 'bg-blue-800 text-white' : ''
              }`}
            >
              <p>Brand Awareness</p>
            </Box>
            <Box
              onClick={() => handleCampaignType('social-engagement')}
              className={`flex flex-row justify-center items-center rounded-lg w-1/4 h-32 bg-gray-200 spacing-2 ${
                campaignType === 'social-engagement' ? 'bg-blue-800 text-white' : ''
              }`}
            >
              <p>Social Engagement</p>
            </Box>
            <Box
              onClick={() => handleCampaignType('conversion')}
              className={`flex flex-row justify-center items-center rounded-lg w-1/4 h-32 bg-gray-200 spacing-2 ${
                campaignType === 'conversion' ? 'bg-blue-800 text-white' : ''
              }`}
            >
              <p>Conversion</p>
            </Box>
          </Box>
        </Box>
      </Fade>
      {campaignType !== '' ? (
        <Fade triggerOnce>
          <Box className="w-full mt-16">
            <p className="margin-bottom center-text setup-campaign-question">
              How will this campaign reward participants?
            </p>
            <Box className="flex flex-row justify-center space-x-4 ">
              <Box
                onClick={() => {
                  handleBudgetType('crypto');
                  handleCampaignChange('numOfTiers', 3);
                }}
                className={`flex flex-row justify-center items-center rounded-lg w-96 h-32 bg-gray-200 spacing-2 ${
                  budgetType === 'crypto' ? 'bg-blue-800 text-white' : ''
                }`}
              >
                {budgetType === 'crypto' ? (
                  <ReactSVG className="coiin-svg" src={coiin_yellow} />
                ) : (
                  <ReactSVG className="coiin-svg" src={coiin_black} />
                )}
                <p>Crypto</p>
              </Box>
              <Box
                onClick={() => {
                  if (props.company.toLowerCase() === 'raiinmaker') {
                    handleBudgetType('raffle');
                    handleCampaignChange('numOfTiers', 0);
                    handleCampaignChange('initialTotal', 0);
                  }
                }}
                className={`flex flex-row justify-center items-center rounded-lg w-96 h-32 bg-gray-200 spacing-2 ${
                  budgetType === 'raffle' ? 'bg-blue-800 text-white' : ''
                }`}
              >
                <FaTicketAlt className="mr-2" />
                <p>Raffle (Coming Soon)</p>
              </Box>
              <Box
                onClick={() => null}
                className={`flex flex-row justify-center items-center rounded-lg w-96 h-32 bg-gray-200 spacing-2 ${
                  budgetType === 'nft' ? 'bg-blue-800 text-white' : ''
                }`}
              >
                <FaFile className="mr-2" />
                <p>NFT (Coming Soon)</p>
              </Box>
            </Box>
            {budgetType !== '' ? (
              <Box className="w-2/6 mt-10">
                {budgetType == 'crypto' ? (
                  <Fade triggerOnce>
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
                      label={'Campaign Budget'}
                      name={'budget'}
                      placeholder={'100'}
                      fullWidth
                      variant="outlined"
                      margin={'normal'}
                      type="number"
                      value={campaign.config.coiinBudget}
                      onChange={(event) => {
                        if (data && data.getFundingWallet) {
                          for (let i = 0; i < data?.getFundingWallet.currency.length; i++) {
                            let token;
                            if (data?.getFundingWallet.currency[i].type == campaign.config.cryptoSymbol) {
                              token = data?.getFundingWallet.currency[i];
                            }
                            if (token) {
                              if (parseInt(event.target.value) > token.balance) {
                                event.target.value = token.balance.toString();
                              }
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
                  </Fade>
                ) : budgetType == 'raffle' ? (
                  <div>
                    <div className="image-upload-container">
                      <label htmlFor="single">
                        <div>
                          {campaign.config.raffleImage?.file ? (
                            <div className="image-preview">
                              <img src={URL.createObjectURL(campaign.config.raffleImage.file)} alt="Raffle" />
                            </div>
                          ) : (
                            <ReactSVG src={icon} color="#3B5998" />
                          )}
                        </div>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        id="single"
                        onChange={(e) => handleImage(e, 'raffle', onSuccess, onError)}
                      />
                    </div>
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
                  </div>
                ) : (
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
            ) : (
              <div />
            )}
          </Box>
        </Fade>
      ) : (
        <div />
      )}
    </Box>
  );
};
