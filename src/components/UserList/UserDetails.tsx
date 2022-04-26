import axios from 'axios';
import React, { useEffect, useState } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import CustomButton from '../CustomButton';
import styles from './userList.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { CurrencyTypes, RedemptionTypes, UserDetailsProps } from '../../rest-types';
import { CircularProgress } from '@material-ui/core';

const { REACT_APP_URL } = process.env;

const UserDetails: React.FC<any> = (props: UserDetailsProps) => {
  console.log('user status value', props.userStatus);

  const [curreny, setCurrency] = useState<CurrencyTypes[]>();
  const [activeStatus, setActiveStatus] = useState<boolean>();
  const [redemptions, setRedemptions] = useState<RedemptionTypes>();

  useEffect(() => {
    const fetchUserCurrencyDetails = async () => {
      const response = await axios.get(`${REACT_APP_URL}/user/user-balances?userId=${props.id}`, {
        withCredentials: true,
      });
      setCurrency(response.data.data);
    };
    fetchUserCurrencyDetails();
  }, [props]);
  useEffect(() => {
    const fetchRedemptions = async () => {
      const response = await axios.get(`${REACT_APP_URL}/xoxoday/redemption-requirements/${props.id}`, {
        withCredentials: true,
      });
      setRedemptions(response.data.data);
    };
    fetchRedemptions();
  }, []);
  // Update user active status
  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await axios.put(
          `${REACT_APP_URL}/user/update-user-status`,
          {
            id: props.id,
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

  // Handle active user
  const handleActiveUser = () => {
    setActiveStatus(true);
    props.userStatus({ userAction: false, modal: false });
  };
  // Handle banned user
  const handleBannedUser = () => {
    setActiveStatus(false);
    props.userStatus({ userAction: false, modal: false });
  };

  return (
    <div className={styles.userDetailsWrapper}>
      {/* User details */}
      <div className={styles.userSideWrapper}>
        <h2 className={headingStyles.headingSm}>User Details</h2>
        <div className={styles.boxStyle}>
          <h4>User Name:</h4>
          <p>{props?.profile?.username}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Email:</h4>
          <p>{props.email} </p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Kyc Status:</h4>
          <p>{props.kycStatus}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Last Login:</h4>
          <p>{new Date(props.lastLogin).toDateString() || 'Not login ever'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>User Status:</h4>
          <p>{props.active === true ? 'Active' : 'Banned'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Active Since:</h4>
          <p>{new Date(props.createdAt).toDateString()}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Post Frequency:</h4>
          <p>{props?.social_post?.length || 0}</p>
        </div>
        <div className="flex justify-center mt-6">
          {props.active === false ? (
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleActiveUser}>
              Activate User
            </CustomButton>
          ) : (
            <CustomButton className={buttonStyles.secondaryButton} onClick={handleBannedUser}>
              Ban User
            </CustomButton>
          )}
        </div>
      </div>
      {/* User currency details */}
      <div className={styles.transferSide}>
        <h3 className={headingStyles.headingSm}>Transfer User Record</h3>
        <div className={styles.coiinWrapper}>
          <h4 className={headingStyles.headingXs}>Coiin Amount:</h4>
          {curreny && curreny?.length === 0 ? <p>No transfer record found</p> : ''}
          {curreny ? (
            curreny?.map((x: CurrencyTypes) => (
              <div key={props.id} className={styles.boxWrapper}>
                <div className={styles.boxStyle}>
                  <h4>Balance:</h4>
                  <p>{x.balance}</p>
                </div>
                <div className={styles.boxStyle}>
                  <h4>Minimum Withdraw Amount:</h4>
                  <p>{x.minWithdrawAmount}</p>
                </div>
                <div className={styles.boxStyle}>
                  <h4>USD Balance:</h4>
                  <p>{x.usdBalance}</p>
                </div>
                <div className={styles.boxStyle}>
                  <h4>Symbol:</h4>
                  <p>{x.symbol}</p>
                </div>
                <div className={styles.boxStyle}>
                  <h4>Network:</h4>
                  <p>{x.network}</p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      {/* Redemptions details */}
      <div className={styles.redemptionsSide}>
        <h3 className={headingStyles.headingSm}>Redemption Details</h3>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Twitter Redemptions:</h4>
          {redemptions ? (
            <>
              <div className={styles.boxStyle}>
                <h4>Twitter Linked:</h4>
                <p>{redemptions.twitterLinked ? 'True' : 'False'}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Twitter Followers:</h4>
                <p>{redemptions.twitterfollowers}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Twitter followers Requirement:</h4>
                <p>{redemptions.twitterfollowersRequirement}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Participation:</h4>
                <p>{redemptions.participation ? 'True' : 'False'}</p>
              </div>
              <div className={styles.boxStyle}>
                <h4>Order Limit For Twenty Four Hours Reached:</h4>
                <p>{redemptions.orderLimitForTwentyFourHoursReached ? 'True' : 'False'}</p>
              </div>
            </>
          ) : (
            <p>No twitter record found</p>
          )}
        </div>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Tiktok Redemptions:</h4>
          <p>No record found</p>
        </div>
        <div className={styles.boxWrapper}>
          <h4 className={headingStyles.headingXs}>Facebook Redemptions:</h4>
          <p>No record found</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
