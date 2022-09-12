import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import { AgeRangeRequirementSpecs, LocationRequirementSpecs } from '../../../types';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import LocationForm from './LocationForm';
import GenericModal from '../../GenericModal';
import AgeForm from './AgeForm';
import Actions from '../../NewCampaign/Actions';
import CustomButton from '../../CustomButton/CustomButton';
import ValuesForm from './ValuesForm';
import DisplayRequirements from './DisplayRequirements';
import InterestsForm from './InterestsForm';
import SocialFollowersForm from './SocialFollowersForm';
import { updateCampaign } from '../../../store/actions/campaign';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import styles from './requirements.module.css';

const CampaignRequirementsForm: React.FC<ActionsProps> = ({
  activeStep,
  handleBack,
  handleNext,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const { requirements } = campaign;
  const dispatch = useDispatch();
  const [formType, setFormtype] = useState<'location' | 'age' | 'values' | 'interests' | 'social' | ''>('');
  const [selectedFollowerCount, setSelectedFollowerCount] = useState<string>(
    requirements.socialFollowing.twitter.minFollower
      ? requirements.socialFollowing.twitter.minFollower.toString()
      : '0',
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(requirements.interests);
  const [selectedValues, setSelectedValues] = useState<string[]>(requirements.values);
  const [locations, setLocations] = useState<LocationRequirementSpecs[]>(requirements.location);
  const [selectedAgeRange, setAgeRange] = useState<AgeRangeRequirementSpecs>(requirements.ageRange);

  const getLocationString = (val: LocationRequirementSpecs): string => {
    let locationString = '';
    if (val.country) locationString += val.country;
    if (val.state) locationString += `, ${val.state}`;
    if (val.city) locationString += `, ${val.city}`;
    return locationString;
  };

  const next = () => {
    const augmentedCampaign = {
      ...campaign,
      requirements: {
        ...campaign.requirements,
        location: locations,
        values: selectedValues,
        interests: selectedInterests,
        ageRange: selectedAgeRange,
        socialFollowing: {
          twitter: {
            minFollower: parseInt(selectedFollowerCount),
          },
        },
      },
    };
    dispatch(updateCampaign(augmentedCampaign));
    handleNext();
  };

  const handleAgeSubmit = (data: string[]) => {
    const ages: AgeRangeRequirementSpecs = { ...campaign.requirements.ageRange };
    data.forEach((item) => {
      ages[item] = true;
    });
    setAgeRange(ages);
    setFormtype('');
  };

  return (
    <Box className="w-full px-28 mt-10">
      <Fade>
        <Box className="w-full">
          <GenericModal open={Boolean(formType)} onClose={() => setFormtype('')} size="small">
            {formType === 'location' && (
              <LocationForm
                handleSubmit={(data) => {
                  if (Object.values(data).length) {
                    setLocations((prev) => {
                      const values = [...prev];
                      values.push(data);
                      return values;
                    });
                  }
                  setFormtype('');
                }}
              />
            )}
            {formType === 'age' && <AgeForm defaultValues={selectedAgeRange} handleSubmit={handleAgeSubmit} />}
            {formType === 'values' && (
              <ValuesForm
                defaultValue={selectedValues}
                handleSubmit={(data) => {
                  setSelectedValues(data);
                  setFormtype('');
                }}
              />
            )}
            {formType === 'interests' && (
              <InterestsForm
                defaultValue={selectedInterests}
                handleSubmit={(data) => {
                  setSelectedInterests(data);
                  setFormtype('');
                }}
              />
            )}
            {formType === 'social' && (
              <SocialFollowersForm
                defaultValue={selectedFollowerCount}
                handleSubmit={(data) => {
                  setSelectedFollowerCount(data);
                  setFormtype('');
                }}
              />
            )}
          </GenericModal>

          <Box className={styles.requirementsBox}>
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Location Requirements</p>
              <CustomButton className={styles.addButton} onClick={() => setFormtype('location')}>
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row flex-wrap justify-start items-center">
              {locations.map((location) => {
                return (
                  <DisplayRequirements
                    key={getLocationString(location)}
                    value={getLocationString(location)}
                    onRemove={(val) => {
                      setLocations((prev) => {
                        return prev.filter((item) => getLocationString(item) !== val);
                      });
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Box className={styles.requirementsBox}>
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Age Requirements</p>
              <CustomButton className={styles.addButton} onClick={() => setFormtype('age')}>
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row flex-wrap justify-start items-center">
              {Object.keys(selectedAgeRange).map(
                (age) =>
                  selectedAgeRange[age] && (
                    <DisplayRequirements
                      key={age}
                      value={age}
                      onRemove={(val) => {
                        setAgeRange((prev) => {
                          const ages = { ...prev };
                          ages[val] = false;
                          return ages;
                        });
                      }}
                    />
                  ),
              )}
            </Box>
          </Box>

          <Box className={styles.requirementsBox}>
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Values Requirements</p>
              <CustomButton className={styles.addButton} onClick={() => setFormtype('values')}>
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row flex-wrap justify-start items-center">
              {selectedValues.map((value) => {
                return (
                  <DisplayRequirements
                    key={value}
                    value={value}
                    onRemove={(val) =>
                      setSelectedValues((prev) => {
                        return prev.filter((item) => item !== val);
                      })
                    }
                  />
                );
              })}
            </Box>
          </Box>

          <Box className={styles.requirementsBox}>
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Interests Requirements</p>
              <CustomButton className={styles.addButton} onClick={() => setFormtype('interests')}>
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row flex-wrap justify-start items-center">
              {selectedInterests.map((value) => {
                return (
                  <DisplayRequirements
                    key={value}
                    value={value}
                    onRemove={(val) =>
                      setSelectedInterests((prev) => {
                        return prev.filter((item) => item !== val);
                      })
                    }
                  />
                );
              })}
            </Box>
          </Box>

          <Box className={styles.requirementsBox}>
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Social Media Follower Requirements</p>
              <CustomButton className={styles.addButton} onClick={() => setFormtype('social')}>
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row flex-wrap justify-start items-center">
              {selectedFollowerCount && (
                <DisplayRequirements value={selectedFollowerCount} onRemove={() => setSelectedFollowerCount('')} />
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
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

export default CampaignRequirementsForm;
