import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';
import CustomButton from '../../components/CustomButton';
import styles from './profile.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import GenericModal from '../../components/GenericModal';
import UpdateProfile from '../../components/UpdateProfile';
import { ApiClient } from '../../services/apiClient';
import { AdminProfileTypes, FileObject } from '../../types';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import FileUpload from '../../components/FileUpload';
import { generateOrgMediaUrl, uploadMedia } from '../../helpers/utils';
import { MdModeEdit } from 'react-icons/md';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<AdminProfileTypes>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch Data
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

  useEffect(() => {
    if (profile) {
      setImage({
        filename: profile.imagePath,
        file: generateOrgMediaUrl(profile.orgId, profile.imagePath),
        format: `image/${profile.imagePath.split('.')[0]}`,
      });
    }
  }, [profile]);

  // Handle OnChange
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.innerText);
  };

  // 2FA Enabled
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
    debugger;
    if (!name && !image.filename) return new Error('Name or image is required');
    if (name === profile?.name && !image) return new Error('No changes made');
    if (image.filename == profile?.imagePath && name === profile?.name) return new Error('No changes made');
    setLoading(true);
    ApiClient.updateProfile({ name, imagePath: image.filename })
      .then((res) => {
        console.log(res);
        if (res.signedOrgUrl) {
          uploadMedia(res.signedOrgUrl, image, setUploadProgress).then((response) => {
            console.log(response);
          });
        }
        dispatch(showSuccessAlert('Record updated successfully'));
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
        <div className="flex p-2 mb-4 shadow items-center cursor-pointer">
          <h6 className="w-2/5">Name:</h6>
          <p className="w-3/5 text-sm" contentEditable={true} suppressContentEditableWarning onInput={handleOnChange}>
            {profile ? profile.name : 'Loading...'}
          </p>
          <MdModeEdit />
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
          <FileUpload
            value={image}
            label="Add Organization Image"
            mediaType="organizationImage"
            tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
            onFileSuccess={onOrgImageSuccess}
            onFileError={onError}
          />
        </div>
      </div>
      <div>Progress: {uploadProgress && uploadProgress}</div>
      <div>
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleUpdate} loading={loading}>
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
