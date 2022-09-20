import React, { FC } from 'react';
import { CircularProgress, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './cryptoCard.module.css';

interface UserProps {
  title: string;
  value?: string | number;
  icon?: string | JSX.Element;
  tooltipTitle?: string;
  tooltipValue?: string;
  tooltipNetwork?: string;
  removeLoading?: boolean;
  id?: string;
  network?: string;
  removeMethod?: (id: string) => void;
}

const PrimaryCard: FC<UserProps> = ({
  title,
  value,
  icon,
  tooltipTitle,
  tooltipValue,
  tooltipNetwork,
  removeLoading,
  id,
  network,
  removeMethod,
}) => {
  const handleRemove = () => {
    if (id && removeMethod) removeMethod(id);
  };
  if (removeLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={22} />
      </div>
    );
  }
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.row}>
        <Tooltip title={`${tooltipTitle}: ${title}`} placement="top-start">
          <p className={styles.name}>{title.substring(0, 20) || 'Title'}</p>
        </Tooltip>
        {icon && tooltipTitle === 'Token' ? (
          <img src={(icon || '') as string} alt="raiinmaker" className={styles.cryptIcon} />
        ) : (
          <div className="text-indigo-300">{icon}</div>
        )}
      </div>
      <div className={styles.row}>
        <Tooltip title={tooltipValue || ''} placement="top-start">
          <h2 className={tooltipValue == 'Active Since' ? `${styles.activeDate}` : `${styles.balance}`}>{value}</h2>
        </Tooltip>
        {network && (
          <Tooltip title={`${tooltipNetwork}: ${network}`} placement="top-start">
            <p className={styles.network}>{network.substring(0, 20) || 'Network'}</p>
          </Tooltip>
        )}
        {removeMethod && (
          <Tooltip title="Delete Record" placement="top-start">
            <DeleteIcon className={styles.deleteIcon} fontSize="small" onClick={handleRemove} />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default PrimaryCard;
