import React, { FC, useState } from 'react';
import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
import { TabPanel } from '../TabPanel';
import CampaignParticipants from './CampaignParticipants';
import CampaignDetails from './CampaignDetails';
import headingStyles from '../../assets/styles/heading.module.css';

const CampaignTabs: FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="m-4">
      <h2 className={headingStyles.heading2Xl}>Campaign Details</h2>
      <div className="mb-2">
        <AppBar elevation={1} position="static" color="transparent">
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: '#1d3faf' } }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Details" {...a11yProps(0)} className="focus:outline-none" />
            <Tab label="Participants" {...a11yProps(1)} className="focus:outline-none" />
          </Tabs>
        </AppBar>
      </div>

      <Paper className="paper">
        <TabPanel value={value} index={0}>
          <CampaignDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CampaignParticipants />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default CampaignTabs;
