import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Switch } from '@material-ui/core';
import CustomButton from '../../components/CustomButton';
import styles from './profile.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import GenericModal from '../../components/GenericModal';
import KycForm from '../../components/Forms/KycForm';
import { ApiClient } from '../../services/apiClient';
import { AdminProfileTypes, FileObject } from '../../types';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import FileUpload from '../../components/FileUpload';
import { generateOrgMediaUrl, uploadMedia } from '../../helpers/utils';
import { MdModeEdit } from 'react-icons/md';

interface IProfileProps {
  profile: AdminProfileTypes | undefined;
  is2FAEnabled: boolean;
  loading: boolean;
  callback: () => void;
}

const Profile: FC<IProfileProps> = ({ profile, is2FAEnabled, loading, callback }: IProfileProps) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(is2FAEnabled);
  const [isOpen, setIsOpen] = useState(false);
  // const [profile, setProfile] = useState<AdminProfileTypes>();
  const [is2FAloading, setis2FALoading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);

  // Fetch Data
  // useEffect(() => {
  //   setLoading(true);
  //   ApiClient.getProfile()
  //     .then((res) => {
  //       setProfile(res.data);
  //       setChecked(res.data.enabled);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, []);

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
    setis2FALoading(true);
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
      .finally(() => setis2FALoading(false));
    callback();
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
    if ((name && name !== profile?.name) || image.filename !== profile?.imagePath) {
      setUpdateLoading(true);
      ApiClient.updateProfile({ name, imagePath: image.filename })
        .then((res) => {
          if (res.signedOrgUrl && image.filename !== profile?.imagePath) {
            setMediaLoading(true);
            uploadMedia(res.signedOrgUrl, image, setUploadProgress)
              .then(() => {
                dispatch(showSuccessAlert('Organization image updated successfully'));
              })
              .catch((e) => console.log(e))
              .finally(() => setMediaLoading(false));
          }
          dispatch(showSuccessAlert('Name updated successfully'));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(showErrorAlert(err.message));
        })
        .finally(() => setUpdateLoading(false));
      callback();
    } else dispatch(showErrorAlert('No changes made'));
  };

  return (
    <div className={styles.profileWrapper}>
      <GenericModal open={isOpen} onClose={() => setIsOpen(false)} size="medium">
        <KycForm />
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
            {!profile || is2FAloading ? (
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
          <h6 className="w-2/5">Kyc:</h6>
          <CustomButton
            className="bg-blue-800 w-44 p-2 text-white rounded cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Add KYC Information
          </CustomButton>
        </div>
        <div className=" p-2 mb-4 shadow">
          <div className="flex">
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
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="flex justify-end text-blue-800">Progress: {uploadProgress}</div>
          )}
        </div>
      </div>
      <div>
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
