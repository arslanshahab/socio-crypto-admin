import React, { FC, useEffect, useState } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';
import { UserListType, UserTypes } from '../../types';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import { CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '../../store/actions/alerts';

const UserInfo: FC<UserTypes> = ({ userId }: UserTypes) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserListType>();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [banLoading, setBanLoading] = useState(false);
  const [unbanLoading, setUnbanLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userResponse = await axios.get(`${apiURI}/v1/user/single-user/${userId}`, { withCredentials: true });
      setUser(userResponse.data.data);
      setLoading(false);
    };
    fetchData();
  }, [refetch]);

  // Handle active user
  const handleActiveUser = async () => {
    setUnbanLoading(true);
    await axios.put(
      `${apiURI}/v1/user/update-user-status`,
      {
        id: user?.id,
        activeStatus: true,
      },
      { withCredentials: true },
    );
    setUnbanLoading(false);
    dispatch(showSuccessAlert('User activated successfully!'));
    setRefetch(!refetch);
  };

  // Handle banned user
  const handleBannedUser = async () => {
    setBanLoading(true);
    await axios.put(
      `${apiURI}/v1/user/update-user-status`,
      {
        id: user?.id,
        activeStatus: false,
      },
      { withCredentials: true },
    );
    setBanLoading(false);
    dispatch(showSuccessAlert('User banned!'));
    setRefetch(!refetch);
  };

  //Handle reset user password
  const handleResetPassword = async () => {
    setResetLoading(true);
    await axios.put(`${apiURI}/v1/user/reset-user-password/${user?.id}`, {}, { withCredentials: true });
    setResetLoading(false);
    dispatch(showSuccessAlert("User's password reset successfully!"));
  };

  // Delete user
  const handleDeleteUser = async () => {
    setDeleteLoading(true);
    await axios.post(`${apiURI}/v1/user/delete-user-by-id/${user?.id}`, {}, { withCredentials: true });
    setDeleteLoading(false);
    dispatch(showSuccessAlert('User deleted successfully!'));
    setRefetch(!refetch);
  };

  return (
    <div>
      {loading && (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )}
      {user && (
        <div className={styles.userInfoWrapper}>
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
            <p className={`${user.active === true ? 'text-green-700' : 'text-red-700'}`}>
              {user.active === true ? 'Active' : 'Banned'}
            </p>
          </div>
          <div className={styles.boxStyle}>
            <h4>Active Since:</h4>
            <p>{new Date(user.createdAt).toDateString()}</p>
          </div>
          <div className={styles.boxStyle}>
            <h4>Post Frequency:</h4>
            <p>{user?.social_post?.length || 0}</p>
          </div>
          <div className={styles.userActiveButtonsWrapper}>
            <div>
              {user.active === false ? (
                <CustomButton className={buttonStyles.buttonPrimary} onClick={handleActiveUser} loading={unbanLoading}>
                  Activate User
                </CustomButton>
              ) : (
                <CustomButton className={buttonStyles.secondaryButton} onClick={handleBannedUser} loading={banLoading}>
                  Ban User
                </CustomButton>
              )}
            </div>
            <CustomButton className={buttonStyles.successButton} onClick={handleResetPassword} loading={resetLoading}>
              Reset Password
            </CustomButton>
            <CustomButton className={buttonStyles.secondaryButton} onClick={handleDeleteUser} loading={deleteLoading}>
              Delete User
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
