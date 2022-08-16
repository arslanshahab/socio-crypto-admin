import { TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import styles from './updateProfile.module.css';
import CustomButton from '../CustomButton';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { ApiClient } from '../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import { uploadImage } from '../../helpers/utils';

const UpdateProfile: FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState();
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
          uploadImage(res.signedOrgUrl, image, setUploadProgress)
            .then((response) => {
              debugger;
              console.log(response);
            })
            .catch((err) => console.log('abc error -------------------------->>>', err));
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
        <input type="file" onChange={handleFileChange} />
        <div className={styles.imagePreview}>
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : 'https://wwwtest.logistec.com/wp-content/uploads/2017/12/placeholder.png'
            }
            className={styles.image}
            alt="image"
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <CustomButton className={buttonStyles.buttonPrimary} onClick={handleUpdate} loading={loading}>
          Update
        </CustomButton>
      </div>
    </div>
  );
};

export default UpdateProfile;
