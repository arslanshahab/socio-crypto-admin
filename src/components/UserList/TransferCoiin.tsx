import React, { FC, useState } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';

const TransferCoiin: FC = () => {
  const [coiin, setCoiin] = useState('');

  //Handle onChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoiin(e.target.value);
  };

  //Handle addCoiin
  const handleAddCoiin = async () => {
    console.log('addCoiin', coiin);
  };

  //Handle removeCoiin
  const handleRemoveCoiin = async () => {
    console.log('removeCoiin', coiin);
  };

  return (
    <div>
      <h2 className={headingStyles.headingSm}>Transfer Coiin</h2>
      <div className={styles.transferWrapper}>
        <input
          type="text"
          name="coiin"
          value={coiin}
          className={styles.coiinInputField}
          placeholder="Enter Coiin"
          onChange={handleOnChange}
          //   onKeyPress={}
        />
        <div className={buttonStyles.buttonWrapper}>
          <CustomButton className={buttonStyles.buttonPrimary} onClick={handleAddCoiin}>
            Add Coiin
          </CustomButton>
          <CustomButton className={buttonStyles.secondaryButton} onClick={handleRemoveCoiin}>
            Remove Coiin
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TransferCoiin;
