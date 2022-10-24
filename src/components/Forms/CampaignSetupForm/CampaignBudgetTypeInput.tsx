import { Box } from '@material-ui/core';
import React from 'react';

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
    <Box className="w-full mt-10">
      <p className="mb-4 text-center text-2xl">How will this campaign reward participants?</p>
      <Box className="flex flex-row justify-center space-x-4">
        {menu.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              if (item.enabled) {
                handleChange(item.value);
              }
            }}
            className={`cursor-pointer flex flex-row justify-center items-center rounded-full w-56 h-16 border-2 border-denimBlue spacing-2 px-2 text-center ${
              budgetType === item.value ? 'bg-denimBlue text-white' : ''
            }`}
          >
            <p className="text-base">{item.name}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignBudgetTypeInput;
