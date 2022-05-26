import React, { FC } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';
import { UserTypes } from '../../types';

const UserInfo: FC<UserTypes> = ({ userInfo }: UserTypes) => {
  const { user } = userInfo;
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
          <p>{user?.profile?.username}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Email:</h4>
          <p>{user.email} </p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Kyc Status:</h4>
          <p>{user.kycStatus}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Last Login:</h4>
          <p>{new Date(user.lastLogin).toDateString() || 'Not login ever'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>User Status:</h4>
          <p>{user.active === true ? 'Active' : 'Banned'}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Active Since:</h4>
          <p>{new Date(user.createdAt).toDateString()}</p>
        </div>
        <div className={styles.boxStyle}>
          <h4>Post Frequency:</h4>
          <p>{user?.social_post?.length || 0}</p>
        </div>
        <div className="flex justify-center mt-6">
          {user.active === false ? (
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
