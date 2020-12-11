import React, { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';
import Modal from 'react-modal';
import { MultiSelectList } from '../multiSelectList';
import { Fade } from 'react-awesome-reveal';

import {
  defaultAges,
  defaultCountries,
  defaultInterests,
  defaultSocialFollowers,
  defaultStates,
  defaultValues,
} from '../../globals';

export const Requirements: React.FC = () => {
  const requirements = useSelector((state: RootState) => state.newCampaign.requirements);
  const dispatch = useDispatch();
  const [showLocation, setShowLocation] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [city, setRequiredCity] = useState('');
  const [state, setRequiredState] = useState('');
  const [country, setRequiredCountry] = useState('');
  const [selectedAgeRange, setAgeRange] = useState<string[]>([]);
  const [selectedFollowerCount, setSelectedFollowerCount] = useState<string>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleClose = (type: string) => {
    switch (type) {
      case 'location':
        setShowLocation(false);
        if (requirements != null) {
          if (requirements.city) setRequiredCity(requirements.city);
          if (requirements.state) setRequiredState(requirements.state);
          if (requirements.country) setRequiredState(requirements.country);
        } else {
          setRequiredCity('');
          setRequiredState('');
          setRequiredCountry('');
        }
        break;
      case 'age':
        setShowAge(false);
        if (requirements != null) {
          if (requirements.ageRange != null) {
            const temp: string[] = [];
            if (requirements) {
              if (requirements.ageRange) {
                if (requirements.ageRange['0-17']) temp.push('0-17');
                if (requirements.ageRange['18-25']) temp.push('18-25');
                if (requirements.ageRange['26-40']) temp.push('26-40');
                if (requirements.ageRange['41-55']) temp.push('41-55');
                if (requirements.ageRange['55+']) temp.push('55+');
              }
            }
            setAgeRange(temp);
          } else {
            setAgeRange([]);
          }
        } else {
          setAgeRange([]);
        }
        break;
      case 'social':
        setShowSocial(false);
        if (requirements != null) {
          if (requirements.socialFollowing != null) {
            if (requirements.socialFollowing.twitter != null) {
              setSelectedFollowerCount(requirements.socialFollowing.twitter.minFollower.toString());
            }
          } else setSelectedFollowerCount('');
        } else setSelectedFollowerCount('');
        break;
      case 'values':
        setShowValues(false);
        if (requirements != null) {
          if (requirements.values != null) {
            setSelectedValues(requirements.values);
          } else setSelectedValues([]);
        } else setSelectedValues([]);
        break;
      case 'interests':
        setShowInterests(false);
        if (requirements != null) {
          if (requirements.interests != null) {
            setSelectedInterests(requirements.interests);
          } else setSelectedInterests([]);
        } else setSelectedInterests([]);
        break;
    }
  };

  const renderLocationModal = () => {
    return (
      <Modal
        bodyOpenClassName="body-open-modal"
        htmlOpenClassName="html-open-modal"
        isOpen={showLocation}
        onRequestClose={() => handleClose('location')}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <div className="modal-content">
          <p className="modal-title">Location Requirements</p>
          <div>
            <Select
              className="modal-select"
              labelId="data-type-label"
              id="data-type-select"
              value={country}
              style={{ margin: '15px' }}
              onChange={(e) => {
                if (typeof e.target.value == 'string') {
                  setRequiredCountry(e.target.value);
                }
              }}
            >
              {defaultCountries.map((country) => {
                return (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
            {country == 'United States' ? (
              <Select
                className="modal-select"
                labelId="data-type-label"
                id="data-type-select"
                value={state}
                style={{ margin: '15px' }}
                onChange={(e) => {
                  if (typeof e.target.value == 'string') {
                    setRequiredState(e.target.value);
                  }
                }}
              >
                {defaultStates.map((state) => {
                  return (
                    <MenuItem className="modal-select-item" key={state} value={state}>
                      {state}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : (
              <></>
            )}
            <TextField
              fullWidth
              variant="outlined"
              name={'city'}
              label={'City'}
              margin={'normal'}
              className="text-field modal-text-field"
              placeholder={city ? city : 'Required City'}
              onChange={(e) => {
                if (typeof e.target.value == 'string') setRequiredCity(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="button-container">
          <Button
            className="modal-submit modal-button"
            onClick={() => {
              if (city.length) dispatch(updateCampaignState({ cat: 'requirements', key: 'city', val: city }));
              if (state.length) dispatch(updateCampaignState({ cat: 'requirements', key: 'state', val: state }));
              if (country.length) dispatch(updateCampaignState({ cat: 'requirements', key: 'country', val: country }));
              handleClose('location');
            }}
          >
            Submit
          </Button>
          <Button color="primary" variant="contained" className="modal-close" onClick={() => handleClose('location')}>
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  const renderAgeModal = () => {
    return (
      <Modal
        isOpen={showAge}
        onRequestClose={() => handleClose('age')}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <div className="modal-content">
          <p className="modal-title">Age Requirements</p>
          <div>
            <MultiSelectList
              items={defaultAges}
              selectedItems={selectedAgeRange}
              updateSelected={(e: string[]) => {
                const temp = e.map((e) => e);
                setAgeRange(temp);
              }}
            ></MultiSelectList>
          </div>
        </div>
        <div className="button-container">
          <Button
            onClick={() => {
              handleSubmit('age', selectedAgeRange);
              setShowAge(false);
            }}
          >
            submit
          </Button>
          <Button color="primary" variant="contained" onClick={() => handleClose('age')}>
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  const renderSocialModal = () => {
    return (
      <Modal
        isOpen={showSocial}
        onRequestClose={() => handleClose('social')}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <div className="modal-content">
          <p className="modal-title">Social Requirements</p>
          <div>
            <MultiSelectList
              items={defaultSocialFollowers}
              selectedItems={selectedFollowerCount != null ? [selectedFollowerCount] : []}
              maxSelectable={1}
              updateSelected={(e: string[]) => {
                const temp = e.map((e) => e);
                setSelectedFollowerCount(temp[0]);
              }}
            ></MultiSelectList>
          </div>
        </div>
        <div className="button-container">
          <Button
            className="modal-button modal-submit"
            onClick={() => {
              handleSubmit('social', selectedFollowerCount);
              setShowSocial(false);
            }}
          >
            submit
          </Button>
          <Button color="primary" variant="contained" onClick={() => handleClose('social')}>
            Close
          </Button>
        </div>
      </Modal>
    );
  };
  const renderInterestsModal = () => {
    return (
      <Modal
        isOpen={showInterests}
        onRequestClose={() => handleClose('interests')}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <div className="modal-content">
          <p className="modal-title">Interests Requirements</p>
          <div>
            <MultiSelectList
              items={defaultInterests}
              selectedItems={selectedInterests}
              updateSelected={(e: string[]) => {
                const temp = e.map((e) => e);
                setSelectedInterests(temp);
              }}
            ></MultiSelectList>
          </div>
        </div>
        <div className="button-container">
          <Button
            className="modal-button submit-button"
            onClick={() => {
              handleSubmit('interests', selectedInterests);
              setShowInterests(false);
            }}
          >
            submit
          </Button>
          <Button color="primary" variant="contained" className="modal-close" onClick={() => handleClose('interests')}>
            Close
          </Button>
        </div>
      </Modal>
    );
  };

  const renderValuesModal = () => {
    return (
      <Modal
        isOpen={showValues}
        onRequestClose={() => handleClose('values')}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <p className="modal-title">Values Requirements</p>
        <div className="modal-content">
          <div>
            <MultiSelectList
              items={defaultValues}
              selectedItems={selectedValues}
              updateSelected={(e: string[]) => {
                const temp = e.map((e) => e);
                setSelectedValues(temp);
              }}
            ></MultiSelectList>
          </div>
        </div>
        <div className="button-container">
          <Button
            className="modal-button"
            onClick={() => {
              handleSubmit('values', selectedValues);
              setShowValues(false);
            }}
          >
            submit
          </Button>
          <Button
            className="modal-close"
            onClick={() => {
              handleClose('values');
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
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
        if (!Array.isArray(data)) throw Error('data must be array');
        dispatch(
          updateCampaignState({
            cat: 'requirements',
            key: 'ageRange',
            val: {
              '0-17': data.includes('0-17'),
              '18-25': data.includes('18-25'),
              '26-40': data.includes('26-40'),
              '41-55': data.includes('41-55'),
              '55+': data.includes('55+'),
            },
          }),
        );
        setAgeRange(data);
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

  const renderAgeRangeDisplay = () => {
    const temp: string[] = [];
    if (requirements) {
      if (requirements.ageRange) {
        if (requirements.ageRange['0-17']) temp.push('0-17');
        if (requirements.ageRange['18-25']) temp.push('18-25');
        if (requirements.ageRange['26-40']) temp.push('26-40');
        if (requirements.ageRange['41-55']) temp.push('41-55');
        if (requirements.ageRange['55+']) temp.push('55+');
      }
    }
    return temp.map((ageRange) => {
      return (
        <li className="display-item" key={ageRange}>
          {ageRange}
        </li>
      );
    });
  };

  return (
    <div className="init-campaign-container">
      <Fade>
        <div>
          {renderAgeModal()}
          {renderValuesModal()}
          {renderSocialModal()}
          {renderLocationModal()}
          {renderInterestsModal()}
          <div className="requirement-column">
            <div className="requirement-row">
              <div className="row-title-container">
                <p className="row-title">Location Requirements</p>
              </div>

              <div className="row-button-container">
                <Button
                  className="row-button"
                  color="primary"
                  variant="contained"
                  onClick={() => setShowLocation(true)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="requirement-display">
              {requirements && requirements.city ? <li className="display-item">{requirements.city}</li> : <div />}
              {requirements && requirements.state ? <li className="display-item">{requirements.state}</li> : <div />}
              {requirements && requirements.country ? (
                <li className="display-item">{requirements.country}</li>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="requirement-column">
            <div className="requirement-row">
              <div className="row-title-container">
                <p className="row-title">Age Requirements</p>
              </div>

              <div className="row-button-container">
                <Button className="row-button" color="primary" variant="contained" onClick={() => setShowAge(true)}>
                  +
                </Button>
              </div>
            </div>
            <div className="requirement-display">
              {<div className="age-range-display-container">{renderAgeRangeDisplay()}</div>}
            </div>
          </div>
          <div className="requirement-column">
            <div className="requirement-row">
              <div className="row-title-container">
                <p className="row-title">Values Requirements</p>
              </div>

              <div className="row-button-container">
                <Button className="row-button" color="primary" variant="contained" onClick={() => setShowValues(true)}>
                  +
                </Button>
              </div>
            </div>
            <div className="requirement-display">
              {requirements && requirements.values ? (
                <div>
                  {requirements.values.map((value) => {
                    return (
                      <li key={value} className="display-item">
                        {value}
                      </li>
                    );
                  })}
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="requirement-column">
            <div className="requirement-row">
              <div className="row-title-container">
                <p className="row-title">Interests Requirements</p>
              </div>

              <div className="row-button-container">
                <Button
                  className="row-button"
                  color="primary"
                  variant="contained"
                  onClick={() => setShowInterests(true)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="requirement-display">
              {requirements && requirements.interests ? (
                <div>
                  {' '}
                  {requirements.interests.map((interests) => {
                    return (
                      <li key={interests} className="display-item">
                        {interests}
                      </li>
                    );
                  })}
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div className="requirement-column">
            <div className="requirement-row">
              <div className="row-title-container">
                <p className="row-title">Social Requirements</p>
              </div>

              <div className="row-button-container">
                <Button className="row-button" color="primary" variant="contained" onClick={() => setShowSocial(true)}>
                  +
                </Button>
              </div>
            </div>
            <div className="requirement-display">
              {requirements && requirements.socialFollowing && requirements.socialFollowing.twitter ? (
                <li className="display-item">{requirements.socialFollowing.twitter.minFollower.toString()}</li>
              ) : (
                <div />
              )}
            </div>
          </div>{' '}
        </div>
      </Fade>
    </div>
  );
};
