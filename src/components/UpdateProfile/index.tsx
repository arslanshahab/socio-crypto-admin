import { TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';
import styles from './updateProfile.module.css';
import headingStyles from '../../assets/styles/heading.module.css';

const UpdateProfile: FC = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <div className="p-4 ">
      <h2 className={headingStyles.headingSm}>Update Profile</h2>
      <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="standard" />
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
    </div>
  );
};

export default UpdateProfile;
