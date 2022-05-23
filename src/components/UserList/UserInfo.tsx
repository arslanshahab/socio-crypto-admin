import React from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';

const UserInfo = (props: any) => {
  // Handle active user
  const handleActiveUser = () => {
    // setActiveStatus(true);
    // props.userStatus({ userAction: false, modal: false });
  };
  // Handle banned user
  const handleBannedUser = () => {
    // setActiveStatus(false);
    // props.userStatus({ userAction: false, modal: false });
  };
  return (
    <div>
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
    </div>
  );
};

export default UserInfo;
