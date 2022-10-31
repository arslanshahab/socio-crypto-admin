import React, { ChangeEvent, FC, useState } from 'react';
import { Box, CircularProgress, Switch, Typography } from '@material-ui/core';
import CustomButton from '../../components/CustomButton';
import styles from './profile.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import GenericModal from '../../components/GenericModal';
import KycForm from '../../components/Forms/KycForm';
import { ApiClient } from '../../services/apiClient';
import { ProfileTypes, FileObject } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import FileUpload from '../../components/FileUpload';
import { uploadMedia } from '../../helpers/utils';
import { getProfile } from '../../store/actions/profile';
import textStyles from '../../assets/styles/text.module.css';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const [checked, setChecked] = useState<boolean>(profile.enabled);
  const [isOpen, setIsOpen] = useState(false);
  const [is2FAloading, setis2FALoading] = useState(false);
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);

  // Handle OnChange
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 2FA Enabled
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setis2FALoading(true);
    ApiClient.twoFactorAuth({ twoFactorEnabled: event.target.checked })
      .then((res) => {
        if (res.success) {
          setChecked(res.success);
          dispatch(showSuccessAlert('Two-factor authentication enabled'));
          dispatch(getProfile({ ...profile, enabled: true }));
        }
        if (!res.success) {
          setChecked(res.success);
          dispatch(showSuccessAlert('Two-factor authentication disabled'));
          dispatch(getProfile({ ...profile, enabled: false }));
        }
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(showErrorAlert(err.message));
      })
      .finally(() => setis2FALoading(false));
  };

  // On image success
  const onOrgImageSuccess = (data: FileObject) => {
    setImage(data);
  };

  // On Error
  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  // Update Data
  const handleUpdate = async () => {
    setUpdateLoading(true);
    ApiClient.updateProfile({ name, imagePath: image.filename })
      .then((res) => {
        if (res.signedOrgUrl) {
          setMediaLoading(true);
          uploadMedia(res.signedOrgUrl, image, setUploadProgress)
            .then(() => {
              setUploadProgress(0);
              dispatch(getProfile({ ...profile, imageUrl: res.imageUrl, name: res.name }));
              dispatch(showSuccessAlert('Organization image updated successfully'));
            })
            .catch((e) => console.log(e))
            .finally(() => setMediaLoading(false));
        }
        dispatch(getProfile({ ...profile, name }));
        if (name !== profile.name) dispatch(showSuccessAlert('Name updated successfully'));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(showErrorAlert(err.message));
      })
      .finally(() => setUpdateLoading(false));
  };

  return (
    <div className={styles.profileWrapper}>
      <GenericModal open={isOpen} onClose={() => setIsOpen(false)} size="large" persist>
        <KycForm callback={() => setIsOpen(false)} />
      </GenericModal>
      <div className="flex gap-16 items-center">
        <div className="w-52 h-52 inline-block">
          <FileUpload
            value={image}
            label="Add Organization Image"
            mediaType="organizationImage"
            tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
            onFileSuccess={onOrgImageSuccess}
            onFileError={onError}
            imageUrl={profile.imageUrl}
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color="primary">{`${Math.round(
                  uploadProgress,
                )}%`}</Typography>
              </Box>
            </Box>
          )}
        </div>
        <div>
          <div className="flex p-1 items-center">
            <h6 className="w-40">Name:</h6>
            <input
              type="text"
              name="name"
              value={name}
              className={`${styles.editName} ${textStyles.text} pl-1`}
              placeholder="Name"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex p-1 items-center">
            <h6 className="w-40">Email:</h6>
            <p className={`${textStyles.text} w-56 text-sm lowercase`}>{profile ? profile.email : 'Loading...'}</p>
          </div>
          <div className="flex p-1 items-center">
            <h6 className="w-40">Brand:</h6>
            <p className={`${textStyles.text} w-56 text-sm lowercase`}>{profile ? profile.company : 'Loading...'}</p>
          </div>
          <div className="flex p-1 items-center">
            <h6 className="w-40">Email 2FA:</h6>
            <p className="w-56 text-sm">
              {is2FAloading ? (
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
          <div className="flex p-1 items-center">
            <h6 className="w-40">KYC:</h6>
            {profile.verifyStatus === 'APPROVED' ? (
              <p className={`${textStyles.text} w-56 text-sm`}>{profile ? profile.verifyStatus : 'Loading...'}</p>
            ) : (
              <CustomButton
                className="shadow text-blue-800 w-44 py-2 rounded cursor-pointer hover:bg-blue-800 hover:text-white"
                onClick={() => setIsOpen(true)}
              >
                Add KYC Information
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <CustomButton
          className={buttonStyles.buttonPrimary}
          onClick={handleUpdate}
          loading={updateLoading || mediaLoading}
        >
          Update
        </CustomButton>
      </div>
      <div>
        <img />
      </div>
    </div>
  );
};

export default Profile;
