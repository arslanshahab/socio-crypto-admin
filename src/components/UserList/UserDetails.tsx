import React from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import styles from './userList.module.css';

const UserDetails: React.FC<any> = (props: any) => {
  const { userDetails } = props;
  console.log('userDetails: ', userDetails);
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
      </div>
    </div>
  );
};

export default UserDetails;
