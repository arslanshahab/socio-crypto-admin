import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Grid, TextField, Tooltip, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../../../redux/slices/campaign';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import Actions from '../../NewCampaign/Actions';
import GenericModal from '../../GenericModal';
import TermsAndConditions from './TermsAndConditions';
import CustomInput from '../../CustomInput';
import InfoIcon from '@material-ui/icons/Info';
import { Tier } from '../../../types';
import { formatFloat } from '../../../helpers/formatter';

interface Props {
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const CampaignAlgorithmForm: React.FC<Props> = ({
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const numOfTiers = campaign.config.numOfTiers;
  const [agreementChecked, handleAgreementChecked] = useState(campaign.config.agreementChecked);
  const [clickCount, setClickCount] = useState(campaign.algorithm.pointValues.clicks);
  const [viewCount, setViewCount] = useState(campaign.algorithm.pointValues.views);
  const [submissionCount, setSubmissionCount] = useState(campaign.algorithm.pointValues.submissions);
  const [shareCount, setShareCount] = useState(campaign.algorithm.pointValues.shares);
  const [likeCount, setLikeCount] = useState(campaign.algorithm.pointValues.likes);
  const [modalOpen, toggleModal] = useState(false);
  const [tiers, setTiers] = useState(campaign.algorithm.tiers);
  const dispatch = useDispatch();
  const coiinBudget = parseFloat(campaign.config.coiinBudget);
  const initMaxThresh = 100;

  const handleTierChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(
      updateCampaignState({ cat: 'algoTiers', tier: event.target.id, key: event.target.name, val: event.target.value }),
    );
  };

  const initThresh = () => {
    const initialTiers: Tier[] = [];
    for (let i = 1; i <= numOfTiers; i++) {
      const dataObject: Tier = { threshold: '', totalCoiins: '' };
      dataObject.threshold = formatFloat((i / numOfTiers) * initMaxThresh, 2);
      dataObject.totalCoiins = formatFloat((i / numOfTiers) * coiinBudget, 2);
      initialTiers.push(dataObject);
    }
    setTiers(initialTiers);
  };

  useEffect(initThresh, []);

  return (
    <Fade>
      <Box className="w-full px-28 mt-10">
        <GenericModal open={modalOpen} onClose={() => toggleModal(false)} size="medium">
          <TermsAndConditions />
        </GenericModal>
        <Box className="w-full flex flex-row mb-10 space-x-16">
          <Box className="w-3/6">
            <Box className="w-full flex flex-row justify-center items-center space-x-1 mb-10">
              <h3 className="text-2xl text-center text-gray-700">Values</h3>

              <Tooltip
                placement="top"
                title="Define the rate campaign participants will be rewarded for the following actions."
              >
                <InfoIcon className="text-xl text-gray-700" />
              </Tooltip>
            </Box>

            <Box className="w-full flex flex-col">
              <Box className="w-full mb-5">
                <CustomInput
                  type="number"
                  label="Click Value"
                  value={clickCount}
                  placeholder="Click Value"
                  onChange={(e) => setClickCount(e.target.value)}
                />
              </Box>
              <Box className="w-full mb-5">
                <CustomInput
                  label="View Value"
                  placeholder="View Value"
                  value={viewCount}
                  onChange={(e) => setViewCount(e.target.value)}
                />
              </Box>
              <Box className="w-full mb-5">
                <CustomInput
                  label="Submission Value"
                  value={submissionCount}
                  placeholder="Submission Value"
                  onChange={(e) => setSubmissionCount(e.target.value)}
                />
              </Box>
              <Box className="w-full mb-5">
                <CustomInput
                  label="Share Value"
                  value={shareCount}
                  placeholder="Share Value"
                  onChange={(e) => setShareCount(e.target.value)}
                />
              </Box>
              <Box className="w-full mb-5">
                <CustomInput
                  label="Like Value"
                  value={likeCount}
                  placeholder="Like Value"
                  onChange={(e) => setLikeCount(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
          <Box className="w-3/6">
            <Box className="w-full flex flex-row justify-center items-center space-x-1 mb-10">
              <h3 className="text-2xl text-center text-gray-700">Rewards</h3>
              <Tooltip
                placement="top"
                title="Use multiple reward tiers to incentivize participation on your campaign. When the global influence reaches
              the defined thresholds the campaign reward payout will updated."
              >
                <InfoIcon className="text-xl text-gray-700" />
              </Tooltip>
            </Box>
            <Box className="w-full flex flex-col">
              {tiers.map((item, index) => (
                <Box key={index} className="w-full mb-5">
                  <h3 className="text-lg mb-3">{`Tier ${index + 1}`}</h3>
                  <Box className="w-full flex flex-row justify-between items-center space-x-5">
                    <Box className="w-3/6">
                      <CustomInput
                        label="Threshold"
                        id={index.toString()}
                        name="threshold"
                        placeholder="Threshold"
                        value={item.threshold}
                        onChange={handleTierChange}
                      />
                    </Box>
                    <Box className="w-3/6">
                      <CustomInput
                        label={'Total Coiins'}
                        id={index.toString()}
                        name="totalCoiins"
                        placeholder="Total Coiins"
                        value={item.totalCoiins}
                        disabled={index + 1 === numOfTiers}
                        onChange={handleTierChange}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className="w-full flex flex-row justify-center items-center">
          <FormControlLabel
            control={
              <Checkbox
                checked={agreementChecked as boolean}
                onChange={(e, checked) => {
                  dispatch(updateCampaignState({ cat: 'config', key: 'agreementChecked', val: checked }));
                  handleAgreementChecked(checked);
                }}
                style={{ color: '#3f51b5' }}
                name="Brand Agreement"
              />
            }
            label={
              <p className="inline">
                I have read and accepted the <strong>Brand Agreement</strong>
              </p>
            }
          />
        </Box>
        <Box className="w-full">
          <Actions
            activeStep={activeStep}
            firstStep={firstStep}
            finalStep={finalStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default CampaignAlgorithmForm;
