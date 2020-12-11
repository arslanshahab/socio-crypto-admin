import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { FaTicketAlt } from 'react-icons/fa';
import coiin_yellow from '../assets/svg/icon_coiin_yellow copy.svg';
import coiin_black from '../assets/svg/icon_coiin_black copy.svg';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../redux/slices/campaign';
import { ReactSVG } from 'react-svg';

export const SetupCampaign: React.FC = () => {
  const dispatch = useDispatch();

  const [campaignType, setCampaignType] = useState('');
  const [budgetType, setBudgetType] = useState('');

  const handleCampaignChange = (key: string, value: any) => {
    dispatch(updateCampaignState({ cat: 'config', key: key, val: value }));
  };

  return (
    <div className="setup-campaign">
      <div className="margin-bottom">
        <Fade triggerOnce>
          <div className="setup-container">
            <p className="margin-bottom center-text setup-campaign-question">What will this campaign prioritize?</p>
            <div>
              <div
                onClick={() => setCampaignType('video-views')}
                className={`${
                  campaignType === 'video-views' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>View Views</p>
              </div>
              <div
                onClick={() => setCampaignType('brand-awareness')}
                className={`${
                  campaignType === 'brand-awareness' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>Brand Awareness</p>
              </div>
              <div
                onClick={() => setCampaignType('social-engagement')}
                className={`${
                  campaignType === 'social-engagement' ? 'selected-item' : ''
                } inline half-width center-text campaign-type-square`}
              >
                <p>Social Engagement</p>
              </div>
              <div
                onClick={() => setCampaignType('conversion')}
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
                  onClick={() => setBudgetType('coiin')}
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
                        onChange={(event) => {
                          handleCampaignChange('coiinBudget', event.target.value as string);
                        }}
                      />
                    </Fade>
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
