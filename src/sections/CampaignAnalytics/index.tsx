import React, { FC, useState } from 'react';
import styles from './campaignAnalytics.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import Select from 'react-select';
import { StylesConfig } from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const CampaignAnalytics: FC = () => {
  const [openTab, setOpenTab] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles: StylesConfig = {
    control: (provided: Record<string, unknown>, state: any) => ({
      ...provided,
      height: 40,
      borderRadius: 24,
      boxShadow: 'none',
      border: state.isFocused ? '1px solid #1E40AF' : '1px solid #1E40AF',
      '&:hover': {
        border: '1px solid #1E40AF',
      },
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    }),
  };

  return (
    <div>
      <h1 className={`${headingStyles.mainHeading} flex justify-center py-4`}>Campaign Analytics</h1>
      <div className={styles.selectFieldSection}>
        <ul className="mb-4 shadow-md rounded-full inline-flex h-9 bg-orangeYellow" role="tablist">
          <li className="inline-block h-full">
            <a
              className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
                openTab === 1 ? 'bg-cyberYellow' : 'bg-orangeYellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#current campaign"
              role="tablist"
            >
              Current Campaigns
            </a>
          </li>
          <li className="inline-block h-full">
            <a
              className={`uppercase rounded-full block text-black h-full py-2 px-6 text-sm ${
                openTab === 2 ? 'bg-cyberYellow' : 'bg-orangeYellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Post Campaigns
            </a>
          </li>
        </ul>
        <div className={styles.selectField}>
          <Select defaultValue={selectedOption} options={options} styles={customStyles} />
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
