import React, { FC } from 'react';
import { CircularProgress, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './cryptoCard.module.css';

interface UserProps {
  title: string;
  value?: any;
  icon?: any;
  tooltipTitle?: any;
  tooltipValue?: any;
  removeLoading?: any;
  removeId?: any;
  removeMethod?: any;
  refetchCard?: any;
}

const PrimaryCard: FC<UserProps> = ({
  title,
  value,
  icon,
  tooltipTitle,
  tooltipValue,
  removeLoading,
  removeId,
  removeMethod,
  refetchCard,
}) => {
  const handleRemove = async () => {
    await removeMethod({
      variables: {
        paymentMethodId: removeId,
      },
    });
    await refetchCard();
  };
  if (removeId) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.row}>
        <Tooltip title={`${tooltipTitle}: ${title}`} placement="top-start">
          <p className={styles.name}>{title.substring(0, 20) || 'Title'}</p>
        </Tooltip>
        {icon && tooltipTitle === 'Currency Type' ? (
          <img src={icon} alt="raiinmaker" className={styles.cryptIcon} />
        ) : (
          <div className="text-indigo-300">{icon}</div>
        )}
      </div>
      <div className={styles.row}>
        <Tooltip title={tooltipValue} placement="top-start">
          <h2 className={tooltipValue == 'Active Since' ? `${styles.activeDate}` : `${styles.balance}`}>{value}</h2>
        </Tooltip>
        <Tooltip title="Delete Record" placement="top-start">
          <DeleteIcon className={styles.deleteIcon} fontSize="small" onClick={handleRemove} />
        </Tooltip>
      </div>
    </div>
  );
};

export default PrimaryCard;
