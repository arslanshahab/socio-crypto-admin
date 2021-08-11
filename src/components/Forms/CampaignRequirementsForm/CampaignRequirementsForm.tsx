import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../../../redux/slices/campaign';
import Modal from 'react-modal';
import { MultiSelectList } from '../../multiSelectList';
import { Fade } from 'react-awesome-reveal';

import { defaultSocialFollowers } from '../../../helpers/globals';
import { LocationRequirementSpecs } from '../../../types';
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

interface Props {
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const CampaignRequirementsForm: React.FC<Props> = ({
  activeStep,
  handleBack,
  handleNext,
  handleSubmit: handleFormSubmit,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const requirements = campaign.requirements;
  const dispatch = useDispatch();
  const [formType, setFormtype] = useState<'location' | 'age' | 'values' | 'interests' | 'social' | ''>('');
  const [selectedFollowerCount, setSelectedFollowerCount] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [locations, setLocations] = useState<LocationRequirementSpecs[]>(requirements?.location);
  const [selectedAgeRange, setAgeRange] = useState<string[]>([]);

  const handleClose = (type: string) => {
    switch (type) {
      case 'location':
        setFormtype('');
        break;
      case 'age':
        setFormtype('');
        if (requirements != null) {
          if (requirements.ageRange != null) {
            const temp: string[] = [];
            if (requirements) {
              if (requirements.ageRange) {
                temp.push(requirements.ageRange);
              }
            }
            setAgeRange([]);
          } else {
            setAgeRange([]);
          }
        } else {
          setAgeRange([]);
        }
        break;
      case 'social':
        setFormtype('');
        if (requirements != null) {
          if (requirements.socialFollowing != null) {
            if (requirements.socialFollowing.twitter != null) {
              setSelectedFollowerCount(requirements.socialFollowing.twitter.minFollower.toString());
            }
          } else setSelectedFollowerCount('');
        } else setSelectedFollowerCount('');
        break;
      case 'values':
        setFormtype('');
        if (requirements != null) {
          if (requirements.values != null) {
            setSelectedValues(requirements.values);
          } else setSelectedValues([]);
        } else setSelectedValues([]);
        break;
      case 'interests':
        setFormtype('');
        if (requirements != null) {
          if (requirements.interests != null) {
            setSelectedInterests(requirements.interests);
          } else setSelectedInterests([]);
        } else setSelectedInterests([]);
        break;
    }
  };

  const handleSubmit = (type: string, data: any) => {
    switch (type) {
      case 'location':
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'state',
            val: 'WA',
          }),
        );
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'city',
            val: 'Seattle',
          }),
        );
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'country',
            val: 'USA',
          }),
        );
        break;
      case 'age':
        setAgeRange([]);
        break;
      case 'social':
        if (selectedFollowerCount != null) {
          dispatch(
            updateCampaignState({
              cat: 'requirements',
              key: 'socialFollowing',
              val: { twitter: { minFollower: parseInt(selectedFollowerCount) } },
            }),
          );
        }
        break;
      case 'values':
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'values',
            val: selectedValues,
          }),
        );
        break;
      case 'interests':
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'interests',
            val: selectedInterests,
          }),
        );
        break;
    }
  };

  const getLocationString = (val: LocationRequirementSpecs): string => {
    let locationString = '';
    if (val.country) locationString += val.country;
    if (val.state) locationString += `, ${val.state}`;
    if (val.city) locationString += `, ${val.city}`;
    return locationString;
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
            {formType === 'age' && (
              <AgeForm
                defaultValues={selectedAgeRange}
                handleSubmit={(data) => {
                  setAgeRange(data);
                  setFormtype('');
                }}
              />
            )}
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
          <Box className="w-full bg-gray-100 p-5 mb-3 rounded-md">
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Location Requirements</p>
              <CustomButton
                className="bg-blue-800 text-white text-xl w-10 h-10 rounded-full"
                onClick={() => setFormtype('location')}
              >
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row justify-start items-center">
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
          <Box className="w-full bg-gray-100 p-5 mb-3 rounded-md">
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Age Requirements</p>
              <CustomButton
                className="bg-blue-800 text-white text-xl w-10 h-10 rounded-full"
                onClick={() => setFormtype('age')}
              >
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row justify-start items-center">
              {selectedAgeRange.map((age) => {
                return (
                  <DisplayRequirements
                    key={age}
                    value={age}
                    onRemove={(val) => {
                      setAgeRange((prev) => {
                        return prev.filter((item) => item !== val);
                      });
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          <Box className="w-full bg-gray-100 p-5 mb-3 rounded-md">
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Values Requirements</p>
              <CustomButton
                className="bg-blue-800 text-white text-xl w-10 h-10 rounded-full"
                onClick={() => setFormtype('values')}
              >
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row justify-start items-center">
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
          <Box className="w-full bg-gray-100 p-5 mb-3 rounded-md">
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Interests Requirements</p>
              <CustomButton
                className="bg-blue-800 text-white text-xl w-10 h-10 rounded-full"
                onClick={() => setFormtype('interests')}
              >
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row justify-start items-center">
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
          <Box className="w-full bg-gray-100 p-5 mb-3 rounded-md">
            <Box className="w-full flex flex-row justify-between items-center">
              <p className="text-gray-800 text-lg">Social Media Follower Requirements</p>
              <CustomButton
                className="bg-blue-800 text-white text-xl w-10 h-10 rounded-full"
                onClick={() => setFormtype('social')}
              >
                +
              </CustomButton>
            </Box>
            <Box className="w-full flex flex-row justify-start items-center">
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
        handleNext={handleNext}
        handleSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default CampaignRequirementsForm;
