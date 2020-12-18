import React from 'react';
import { AppBar, Tabs, Tab, Typography, Grid, Button } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { WithdrawHistory } from './admin/WithdrawHistory';
import { PendingWithdrawList } from './admin/PendingWithdrawList';
import { BrandList } from './BrandList';
import { RegisterBrand } from '../screens/RegisterBrand';

export const Admin: React.FC = (props) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

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
      <RegisterBrand open={open} setOpen={setOpen} />
      <Grid container>
        <Grid item xs>
          <Typography variant={'h4'}>Admin</Typography>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs>
          <Button variant={'contained'} color={'primary'} onClick={() => setOpen(true)}>
            Register New Brand
          </Button>
        </Grid>
      </Grid>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Payments / KYC" {...a11yProps(0)} />
          <Tab label="Registered Brands" {...a11yProps(1)} />
          <Tab label="Withdraw History" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PendingWithdrawList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrandList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WithdrawHistory></WithdrawHistory>
      </TabPanel>
    </div>
  );
};
