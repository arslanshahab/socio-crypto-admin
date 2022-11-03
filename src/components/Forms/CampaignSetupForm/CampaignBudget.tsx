import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { FC } from 'react';
import { ErrorObject } from '../../../types';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CampaignBudgetTypeInput from './CampaignBudgetTypeInput';

interface CampaignBudget {
  budgetType: string;
  company: string;
  handleBudgetType: (type: string) => void;
  handleCoiinBudgetChange: (event: React.ChangeEvent<any>) => void;
  handleSelectToken: (event: React.ChangeEvent<any>) => void;
  cryptoSymbol: string;
  coiinOptions: string[];
  errors: ErrorObject;
  campaign: any;
  coiinBudget: string;
  isGlobal: boolean;
  handleIsGlobal: () => void;
}

const CampaignBudget: FC<CampaignBudget> = ({
  budgetType,
  company,
  handleBudgetType,
  handleCoiinBudgetChange,
  handleSelectToken,
  cryptoSymbol,
  coiinOptions,
  errors,
  campaign,
  coiinBudget,
  isGlobal,
  handleIsGlobal,
}: CampaignBudget) => {
  return (
    <div className="campaignBudgets">
      <CampaignBudgetTypeInput budgetType={budgetType} company={company} handleChange={handleBudgetType} />
      {budgetType && (
        <div className="selectFieldsWrapper">
          {budgetType == 'crypto' && (
            <div className="selectField">
              <div className="selectFieldOutline">
                <CustomSelect
                  required={true}
                  value={cryptoSymbol}
                  onChange={handleSelectToken}
                  label="Select Token"
                  options={coiinOptions}
                  upperCaseOptions={true}
                  error={errors['cryptoSymbol']}
                  disabled={Boolean(campaign.id)}
                />
              </div>
              <div className="selectFieldOutline">
                <CustomInput
                  required={true}
                  value={coiinBudget}
                  onChange={handleCoiinBudgetChange}
                  placeholder="100"
                  label="Campaign Budget"
                  type="number"
                  error={errors['coiinBudget']}
                  disabled={Boolean(campaign.id)}
                />
              </div>
              <div className="checkboxWrapper">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isGlobal}
                      className="checkbox"
                      name="Brand Agreement"
                      onChange={handleIsGlobal}
                    />
                  }
                  label="Is Global Campaign"
                />
              </div>
            </div>
          )}

          {/* {budgetType === 'raffle' && (
            <div className="raffleInputFieldWrapper">
              <div className="raffleInputPosition">
                <div className="inputFieldWrapper">
                  <CustomInput
                    required={true}
                    value={rafflePrizeName}
                    placeholder="Raffle Campaign Prize"
                    label="Raffle Prize Name"
                    type="text"
                    onChange={(event: React.ChangeEvent<any>) => {
                      setRafflePrizeName(event.target.value);
                      updateErrors('rafflePrizeName', event.target.value);
                    }}
                    error={errors['rafflePrizeName']}
                  />
                </div>
                <div className="inputFieldWrapper">
                  <CustomInput
                    required={true}
                    value={rafflePrizeLink}
                    placeholder="Raffle Affiliate Link"
                    label="Raffle Affiliate Link (optional)"
                    type="text"
                    onChange={(event: React.ChangeEvent<any>) => {
                      setRafflePrizeLink(event.target.value);
                      updateErrors('rafflePrizeLink', event.target.value);
                    }}
                    error={errors['rafflePrizeLink']}
                  />
                </div>
                <div className="checkboxWrapper">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isGlobal}
                        className="checkbox"
                        name="Brand Agreement"
                        onChange={(e, checked) => {
                          setIsGlobal(checked);
                        }}
                      />
                    }
                    label="Is Global Campaign"
                  />
                </div>
              </div>
              <div className="uploadloadFileWrapper">
                <FileUpload
                  value={raffleImage}
                  label="Upload Raffle Image"
                  onFileSuccess={onFileSuccess}
                  onFileError={onFileError}
                  mediaType="raffle"
                />
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default CampaignBudget;
