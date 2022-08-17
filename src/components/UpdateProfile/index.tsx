import { TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import styles from './updateProfile.module.css';
import CustomButton from '../CustomButton';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import { uploadMedia } from '../../helpers/utils';
import { FileObject } from '../../types';
import FileUpload from '../FileUpload';

const UpdateProfile: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState<FileObject>({
    filename: '',
    file: '',
    format: '',
  });
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePath(file.name);
  };

  // Update Data
  const handleUpdate = async () => {
    setLoading(true);
    ApiClient.updateProfile({ name, imagePath })
      .then((res) => {
        console.log(res);
        if (res.signedOrgUrl && image) {
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

  const onCampaignImageSuccess = (data: FileObject) => {
    debugger;
    setImage(data);
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  return (
    <div className="p-4 ">
      <h2 className={headingStyles.headingSm}>Update Profile</h2>
      <TextField
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="User Name"
        variant="standard"
      />
      <div className="flex  mt-6 items-center justify-between">
        <FileUpload
          value={image}
          label="Add Campaign Image"
          updateLabel="Update Campaign Image"
          mediaType="campaignImage"
          tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
          onFileSuccess={onCampaignImageSuccess}
          onFileError={onError}
        />
      </div>
      <div>Progress: {uploadProgress && uploadProgress}</div>
      <div className="flex justify-center mt-6">
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleUpdate} loading={loading}>
          Update
        </CustomButton>
      </div>
    </div>
  );
};

export default UpdateProfile;
