import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { CampaignAuditList } from './admin/CampaignAuditList';
import { PendingWithdrawList } from './admin/PendingWithdrawList';

export const Admin: React.FC = () => {
  const [value, setValue] = React.useState(0);

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <p>Admin</p>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Payments / KYC" {...a11yProps(0)} />
          <Tab label="Audit Campaign" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PendingWithdrawList></PendingWithdrawList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CampaignAuditList></CampaignAuditList>
      </TabPanel>
    </div>
  );
};
