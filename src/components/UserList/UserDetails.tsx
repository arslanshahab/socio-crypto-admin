import axios from 'axios';
import React, { useEffect, useState } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import styles from './userList.module.css';

const UserDetails: React.FC<any> = (props: any) => {
  const { userDetails } = props;
  const [curreny, setCurrency] = useState<any>();
  useEffect(() => {
    const fetchUserCurrencyDetails = async () => {
      const response = await axios.get(`http://localhost:4000/v1/user/wallet-balances?userId=${userDetails.id}`);
      setCurrency(response.data.data);
    };
    fetchUserCurrencyDetails();
  }, [userDetails]);
  console.log('userDetails: ', userDetails, '---------', curreny);

  return (
    <div className={styles.userDetailsWrapper}>
      <div className={styles.userSideWrapper}>
        <h2 className={headingStyles.headingSm}>User Details</h2>
        <div className={styles.boxStyle}>
          <h4>User Name:</h4>
          <p>{userDetails.profile.username}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Email:</h4>
          <p>{userDetails.email} </p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Kyc Status:</h4>
          <p>{userDetails.kycStatus}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Last Login:</h4>
          <p>{new Date(userDetails.lastLogin).toDateString() || 'Not login ever'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>User Banned:</h4>
          <p>{userDetails.active === true ? 'Active' : 'Banned'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Active Since:</h4>
          <p>{new Date(userDetails.createdAt).toDateString()}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Post Frequency:</h4>
          <p>{userDetails.social_post.length || 0}</p>
        </div>
      </div>
      <div className={styles.transferSide}>
        <h3 className={headingStyles.headingSm}>Transfer User Record</h3>
        <h4 className={headingStyles.headingXs}>Coiin Amount:</h4>
        {curreny &&
          curreny?.map((x: any) => (
            <div className="shadow-md rounded-sm my-2 p-2" key={userDetails.id}>
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
          ))}
      </div>
    </div>
  );
};

export default UserDetails;
