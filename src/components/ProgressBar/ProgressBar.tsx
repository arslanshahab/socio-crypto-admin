import React, { FC } from 'react';
import styles from './progressBar.module.css';

const ProgressBar: FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__element}></div>
    </div>
  );
};

export default ProgressBar;
