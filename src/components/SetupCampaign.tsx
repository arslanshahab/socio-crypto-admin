import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { FaTicketAlt } from 'react-icons/fa';
import coiin_yellow from '../assets/svg/icon_coiin_yellow copy.svg';
import coiin_black from '../assets/svg/icon_coiin_black copy.svg';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../redux/slices/campaign';
import { ReactSVG } from 'react-svg';
import icon from '../assets/svg/camera.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';

interface Props {
  company: string;
  raffleImage?: string;
}

export const SetupCampaign: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [campaignType, setCampaignType] = useState(campaign.config.campaignType ? campaign.config.campaignType : '');
  const [budgetType, setBudgetType] = useState(campaign.config.budgetType ? campaign.config.budgetType : '');
  const handleCampaignChange = (key: string, value: any) => {
    dispatch(updateCampaignState({ cat: 'config', key: key, val: value }));
  };

  const getBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (reader.result) {
        dispatch(updateCampaignState({ cat: 'config', key: 'raffleImage', val: reader.result }));
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleImage = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files != null && files.length) {
      const formData = new FormData();
      formData.append(files[0].name, files[0]);
      getBase64(files[0]);
    }
  };
  const handleCampaignType = (type: string) => {
    setCampaignType(type);
    dispatch(updateCampaignState({ cat: 'config', key: 'campaignType', val: type }));
  };

  const handleBudgetType = (type: string) => {
    setBudgetType(type);
    handleCampaignChange('budgetType', type);
  };

  return (
    <div className="setup-campaign">
      <div className="margin-bottom">
        <Fade triggerOnce>
          <div className="setup-container">
            <p className="margin-bottom center-text setup-campaign-question">What will this campaign prioritize?</p>
            <div>
              <div
                onClick={() => handleCampaignType('video-views')}
                className={`${
                  campaignType === 'video-views' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>View Views</p>
              </div>
              <div
                onClick={() => handleCampaignType('brand-awareness')}
                className={`${
                  campaignType === 'brand-awareness' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>Brand Awareness</p>
              </div>
              <div
                onClick={() => handleCampaignType('social-engagement')}
                className={`${
                  campaignType === 'social-engagement' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>Social Engagement</p>
              </div>
              <div
                onClick={() => handleCampaignType('conversion')}
                className={`${
                  campaignType === 'conversion' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>Conversion</p>
              </div>
            </div>
          </div>
        </Fade>
        {campaignType !== '' ? (
          <Fade triggerOnce>
            <div className="budget-container">
              <p className="margin-bottom center-text setup-campaign-question">
                How will this campaign reward participants?
              </p>
              <div>
                <div
                  onClick={() => {
                    handleBudgetType('coiin');
                    handleCampaignChange('numOfTiers', 3);
                  }}
                  className={`${
                    budgetType === 'coiin' ? 'selected-item' : ''
                  } inline half-width center-text campaign-funding-square`}
                >
                  {budgetType === 'coiin' ? (
                    <ReactSVG className="coiin-svg" src={coiin_yellow}></ReactSVG>
                  ) : (
                    <ReactSVG className="coiin-svg" src={coiin_black}></ReactSVG>
                  )}
                  <p>Coiin</p>
                </div>
                <div
                  onClick={() => {
                    if (props.company.toLowerCase() === 'raiinmaker') {
                      handleBudgetType('raffle');
                      handleCampaignChange('numOfTiers', 0);
                      handleCampaignChange('initialTotal', 0);
                    }
                  }}
                  className={`${
                    budgetType === 'raffle' ? 'selected-item' : ''
                  } inline half-width center-text campaign-funding-square`}
                >
                  <FaTicketAlt></FaTicketAlt>
                  <p>Raffle (Coming Soon)</p>
                </div>
              </div>
              {budgetType !== '' ? (
                <div className="budget-input-container">
                  {budgetType == 'coiin' ? (
                    <Fade triggerOnce>
                      <TextField
                        label={'Campaign Budget (Coiin)'}
                        name={'budget'}
                        placeholder={'100'}
                        fullWidth
                        variant="outlined"
                        margin={'normal'}
                        type="number"
                        value={campaign.config.coiinBudget}
                        onChange={(event) => {
                          handleCampaignChange('coiinBudget', event.target.value as string);
                        }}
                      />
                    </Fade>
                  ) : budgetType == 'raffle' ? (
                    <div>
                      <div className="image-upload-container">
                        <label htmlFor="single">
                          <div>
                            {props.raffleImage ? (
                              <div className="image-preview">
                                <img src={props.raffleImage}></img>
                              </div>
                            ) : (
                              <ReactSVG src={icon} color="#3B5998" />
                            )}
                          </div>
                        </label>
                        <input className="hidden" type="file" id="single" onChange={handleImage} />
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
                </div>
              ) : (
                <div />
              )}
            </div>
          </Fade>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
