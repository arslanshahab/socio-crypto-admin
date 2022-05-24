import axios from 'axios';
import React, { useEffect, useState } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import CustomButton from '../CustomButton';
import styles from './userList.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { CurrencyTypes, RedemptionTypes, UserDetailsProps } from '../../rest-types';
import { AppBar, CircularProgress, Paper, Tab, Tabs } from '@material-ui/core';
import { apiURI } from '../../clients/raiinmaker-api';
import { TabPanel } from '../TabPanel';
import UserTransactionHistory from './UserTransactionHistory';
import { useParams } from 'react-router-dom';
import UserTransferRecord from './UserTransferRecord';
import RedemptionDetials from './RedemptionDetials';
import UserInfo from './UserInfo';

const UserDetails: React.FC<any> = (props: UserDetailsProps) => {
  const { id }: { id: string } = useParams();
  const [curreny, setCurrency] = useState<CurrencyTypes[]>();
  const [activeStatus, setActiveStatus] = useState<boolean>();
  const [redemptions, setRedemptions] = useState<RedemptionTypes>();
  const [value, setValue] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchUserCurrencyDetails = async () => {
      const response = await axios.get(`${apiURI}/v1/user/user-balances/${id}`, { withCredentials: true });
      setCurrency(response.data.data);
    };
    const fetchTransactionHistory = async () => {
      const response = await axios.get(`${apiURI}/v1/user/user-transactions-history/${id}`, { withCredentials: true });
      setTransactionHistory(response.data.data.items);
    };
    fetchUserCurrencyDetails();
    fetchTransactionHistory();
  }, [props]);

  useEffect(() => {
    const fetchRedemptions = async () => {
      const response = await axios.get(`${apiURI}/v1/xoxoday/redemption-requirements/${id}`, { withCredentials: true });
      setRedemptions(response.data.data);
    };
    fetchRedemptions();
  }, []);

  // Update user active status
  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await axios.put(
          `${apiURI}/v1/user/update-user-status`,
          {
            id: id,
            activeStatus: activeStatus,
          },
          { withCredentials: true },
        );
      } catch (e) {
        console.log('error: ', e);
      }
    };
    handleUpdate();
  }, [activeStatus]);

  //!-----------------------------------------------
  const handleChange = (e: any, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  //!-----------------------------------------------

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
            <Tab label="Transaction History" {...a11yProps(2)} className="focus:outline-none" />
          </Tabs>
        </AppBar>
      </div>

      <Paper className="paper">
        <TabPanel value={value} index={0}>
          <UserInfo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserTransferRecord transferUserRecord={curreny} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RedemptionDetials redemptionDetails={redemptions} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserTransactionHistory transactionHistory={transactionHistory} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default UserDetails;
