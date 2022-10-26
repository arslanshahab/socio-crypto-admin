import React, { FC, useState } from 'react';
import styles from './userList.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import buttonStyles from '../../assets/styles/customButton.module.css';
import CustomButton from '../CustomButton';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import { ApiClient } from '../../services/apiClient';

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
    setAddLoading(true);
    ApiClient.cryptoTransfers({ amount: coiin, userId, action: 'ADD', symbol: 'COIIN', network: 'BSC' })
      .then(() => {
        dispatch(showSuccessAlert('Transferred coiin successfully'));
      })
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => setAddLoading(false));
  };

  //Handle removeCoiin
  const handleRemoveCoiin = async () => {
    setRemoveLoading(true);
    ApiClient.cryptoTransfers({ amount: coiin, userId, action: 'REMOVE', symbol: 'COIIN', network: 'BSC' })
      .then(() => {
        dispatch(showSuccessAlert('Removed coiin successfully'));
      })
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => setRemoveLoading(false));
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
