import React, { FC, useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';
import CustomButton from '../../components/CustomButton';
import styles from './profile.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import GenericModal from '../../components/GenericModal';
import UpdateProfile from '../../components/UpdateProfile';
import { ApiClient } from '../../services/apiClient';
import { AdminProfileTypes } from '../../types';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<AdminProfileTypes>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiClient.getProfile()
      .then((res) => {
        setProfile(res.data);
        setChecked(res.data.enabled);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    ApiClient.twoFactorAuth({ twoFactorEnabled: event.target.checked })
      .then((res) => {
        if (res.success) {
          setChecked(res.success);
          dispatch(showSuccessAlert('Two-factor authentication enabled'));
        }
        if (!res.success) {
          setChecked(res.success);
          dispatch(showSuccessAlert('Two-factor authentication disabled'));
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(showErrorAlert(err.message));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.profileWrapper}>
      <GenericModal open={isOpen} onClose={() => setIsOpen(false)} size="small">
        <UpdateProfile />
      </GenericModal>
      <div className={styles.profile}>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Name:</h6>
          <p className="w-3/5 text-sm">{profile ? profile.name : 'Loading...'}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Email:</h6>
          <p className="w-3/5 text-sm lowercase">{profile ? profile.email : 'Loading...'}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Brand Name:</h6>
          <p className="w-3/5 text-sm">{profile ? profile.company : 'Loading...'}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">2FA:</h6>
          <p className="w-3/5 text-sm">
            {!profile || loading ? (
              'Loading...'
            ) : (
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
              />
            )}
          </p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Brand Logo:</h6>
          <div className="w-3/5 h-44 shadow-sm ">
            <img
              src="https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg"
              alt="logo"
              className={styles.brandImage}
            />
          </div>
        </div>
      </div>
      <div>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={() => setIsOpen(true)}>
          Update
        </CustomButton>
      </div>
    </div>
  );
};

export default Profile;
