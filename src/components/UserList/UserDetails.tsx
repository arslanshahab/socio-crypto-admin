import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './userList.module.css';
import { AppBar, Paper, Tab, Tabs } from '@material-ui/core';
import { apiURI } from '../../clients/raiinmaker-api';
import { TabPanel } from '../TabPanel';
import UserTransactionHistory from './UserTransactionHistory';
import { useParams } from 'react-router-dom';
import UserTransferRecord from './UserTransferRecord';
import RedemptionDetials from './RedemptionDetials';
import UserInfo from './UserInfo';
import { RedemptionTypes, CurrencyTypes } from '../../types';
import TransferCoiin from './TransferCoiin';
import Statistics from './Statistics';

const UserDetails: React.FC = () => {
  const { id }: { id: string } = useParams();
  const [curreny, setCurrency] = useState<CurrencyTypes[]>([]);
  const [redemptions, setRedemptions] = useState<RedemptionTypes>();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const fetchUserCurrencyDetails = async () => {
      const response = await axios.get(`${apiURI}/v1/user/user-balances/${id}`, { withCredentials: true });
      setCurrency(response.data.data);
    };
    fetchUserCurrencyDetails();
  }, []);

  useEffect(() => {
    const fetchRedemptions = async () => {
      const response = await axios.get(`${apiURI}/v1/xoxoday/redemption-requirements/${id}`, { withCredentials: true });
      setRedemptions(response.data.data);
    };
    fetchRedemptions();
  }, []);

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
    <>
      <div className={styles.appBarWrapper}>
        <AppBar position="static" color="transparent">
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: '#1d3faf' } }}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="User Details" {...a11yProps(0)} className="focus:outline-none" />
            <Tab label="Transfer User Record" {...a11yProps(1)} className="focus:outline-none" />
            <Tab label="Redemption Details" {...a11yProps(2)} className="focus:outline-none" />
            <Tab label="Transaction History" {...a11yProps(3)} className="focus:outline-none" />
            <Tab label="Transfer Coiin" {...a11yProps(4)} className="focus:outline-none" />
            <Tab label="Statistics" {...a11yProps(5)} className="focus:outline-none" />
          </Tabs>
        </AppBar>
      </div>

      <Paper className="paper">
        <TabPanel value={value} index={0}>
          <UserInfo userId={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserTransferRecord transferUserRecord={curreny} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RedemptionDetials redemptionDetails={redemptions} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserTransactionHistory />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TransferCoiin userId={id} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Statistics />
        </TabPanel>
      </Paper>
    </>
  );
};

export default UserDetails;
