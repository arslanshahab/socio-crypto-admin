import React, { FC, useState } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';
import { apiURI } from '../../clients/raiinmaker-api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';

type IProps = {
  userId: string;
};

const TransferCoiin: FC<IProps> = ({ userId }: IProps) => {
  const dispatch = useDispatch();
  const [coiin, setCoiin] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  //Handle onChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoiin(e.target.value);
  };

  //Handle addCoiin
  const handleAddCoiin = async () => {
    try {
      setAddLoading(true);
      await axios.post(
        `${apiURI}/v1/user/transfer-user-coiin`,
        { coiin, userId, action: 'ADD' },
        { withCredentials: true },
      );
      dispatch(showSuccessAlert('Coiin added successfully!'));
      setAddLoading(false);
    } catch (e) {
      dispatch(showErrorAlert('Something went wrong!'));
      setAddLoading(false);
    }
  };

  //Handle removeCoiin
  const handleRemoveCoiin = async () => {
    try {
      setRemoveLoading(true);
      await axios.post(
        `${apiURI}/v1/user/transfer-user-coiin`,
        { coiin, userId, action: 'REMOVE' },
        { withCredentials: true },
      );
      dispatch(showSuccessAlert('Coiin removed successfully!'));
      setRemoveLoading(false);
    } catch (error) {
      dispatch(showErrorAlert('Something went wrong!'));
      setRemoveLoading(false);
    }
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
        />
        <div className={buttonStyles.buttonWrapper}>
          <CustomButton className={buttonStyles.buttonPrimary} onClick={handleAddCoiin} loading={addLoading}>
            Add Coiin
          </CustomButton>
          <CustomButton className={buttonStyles.secondaryButton} onClick={handleRemoveCoiin} loading={removeLoading}>
            Remove Coiin
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TransferCoiin;
