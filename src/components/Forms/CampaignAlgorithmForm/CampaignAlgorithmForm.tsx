import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import Actions from '../../NewCampaign/Actions';
import GenericModal from '../../GenericModal';
import TermsAndConditions from './TermsAndConditions';
import CustomInput from '../../CustomInput';
import InfoIcon from '@material-ui/icons/Info';
import { AlgoTier, Tier } from '../../../types';
import { formatFloat } from '../../../helpers/formatter';
import { updateCampaign } from '../../../store/actions/campaign';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import { showErrorAlert } from '../../../store/actions/alerts';

const CampaignAlgorithmForm: React.FC<ActionsProps> = ({
  activeStep,
  handleBack,
  handleNext,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const numOfTiers = parseInt(campaign.config.numOfTiers);
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
    const key = event.target.id;
    const name = event.target.name as 'totalCoiins' | 'threshold';
    const newTiers = { ...tiers };
    const tier = { ...tiers[key] };
    if (name === 'threshold') {
      tier.threshold = event.target.value;
    } else {
      tier.totalCoiins = event.target.value;
    }
    newTiers[key] = tier;
    setTiers(newTiers);
  };

  const initThresh = () => {
    if (!Object.values(campaign.algorithm.tiers).length) {
      const initialTiers: AlgoTier = {};
      for (let i = 1; i <= numOfTiers; i++) {
        const dataObject: Tier = { threshold: '', totalCoiins: '' };
        dataObject.threshold = formatFloat((i / numOfTiers) * initMaxThresh, 0);
        dataObject.totalCoiins = formatFloat((i / numOfTiers) * coiinBudget, 0);
        initialTiers[i] = dataObject;
      }
      setTiers(initialTiers);
    }
  };

  useEffect(initThresh, []);

  const submit = () => {
    if (!agreementChecked) {
      dispatch(showErrorAlert('Please Accept Terms and Conditions!'));
      return;
    }
    if (validateTiers()) {
      const augmentedCampaign = {
        ...campaign,
        algorithm: {
          ...campaign.algorithm,
          tiers,
          pointValues: {
            ...campaign.algorithm.pointValues,
            clicks: clickCount,
            views: viewCount,
            submissions: submissionCount,
            likes: likeCount,
            shares: shareCount,
          },
        },
        config: {
          ...campaign.config,
          agreementChecked: agreementChecked,
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
    }
  };

  const validateTiers = () => {
    let validated = true;
    for (let i = 1; i < numOfTiers; i++) {
      const tier = tiers[i];
      if (!tier.threshold || !tier.totalCoiins) {
        dispatch(showErrorAlert('Please add all Reward values'));
        return (validated = false);
      }
    }
    return validated;
  };

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
              {Object.values(tiers).map((item, index) => (
                <Box key={index} className="w-full mb-5">
                  <h3 className="text-lg mb-3">{`Tier ${index + 1}`}</h3>
                  <Box className="w-full flex flex-row justify-between items-center space-x-5">
                    <Box className="w-3/6">
                      <CustomInput
                        label="Threshold"
                        id={(index + 1).toString()}
                        name="threshold"
                        placeholder="Threshold"
                        value={item.threshold}
                        onChange={handleTierChange}
                      />
                    </Box>
                    <Box className="w-3/6">
                      <CustomInput
                        label={'Total Coiins'}
                        id={(index + 1).toString()}
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
            handleNext={submit}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default CampaignAlgorithmForm;
