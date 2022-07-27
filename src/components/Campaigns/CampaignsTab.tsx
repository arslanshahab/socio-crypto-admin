import React, { FC, useState } from 'react';
import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
import { TabPanel } from '../TabPanel';
import CampaignTable from './CampaignTable';
import PostCampaigns from './PostCampaigns';

const CampaignsTab: FC = () => {
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
    <div>
      <div className="mb-2">
        <AppBar elevation={1} position="static" color="transparent">
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: '#1d3faf' } }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Current Campaigns" {...a11yProps(0)} className="focus:outline-none" />
            <Tab label="Past Campaigns" {...a11yProps(1)} className="focus:outline-none" />
          </Tabs>
        </AppBar>
      </div>

      <Paper className="paper">
        <TabPanel value={value} index={0}>
          <CampaignTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostCampaigns />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default CampaignsTab;
