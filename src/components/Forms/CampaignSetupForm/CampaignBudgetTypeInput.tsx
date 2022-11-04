import { Box } from '@material-ui/core';
import React from 'react';
import './campaignSetupForm.scss';

interface Props {
  budgetType: string;
  handleChange: (val: string) => void;
  company: string;
}
interface MenuItem {
  name: string;
  value: string;
  enabled: boolean;
}
const CampaignBudgetTypeInput: React.FC<Props> = ({ budgetType, handleChange }) => {
  const menu: Array<MenuItem> = [
    { name: 'Crypto', value: 'crypto', enabled: true },
    { name: 'Raffle (Coming Soon)', value: 'raffle', enabled: false },
    { name: 'Social Engagement (Coming Soon)', value: 'social-engagement', enabled: false },
  ];

  return (
    <Box className="campaignBudgetTypesWrapper">
      <p>
        <span>3/3</span> How will this campaign reward participants?
      </p>
      <Box className="campaignBudgetTypeList">
        {menu.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              if (item.enabled) {
                handleChange(item.value);
              }
            }}
            className={`selectField  ${budgetType === item.value ? 'selectedField' : 'select'}`}
          >
            <p>{item.name}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignBudgetTypeInput;
