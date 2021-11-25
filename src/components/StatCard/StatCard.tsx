import React from 'react';
import styles from './statCard.module.css';
import { StateCardDataType } from '../DashboardHome';

interface IProps {
  data: StateCardDataType;
  cardType: string;
}

const StatCard = (props: IProps) => {
  const { data, cardType } = props;
  return (
    <div className={styles.statCardWrapper}>
      <p className={styles.textSm}>{data.title}</p>
      <div className={styles.contentCircle}>
        <h2 className={styles.textLg}>{data.numbers}</h2>
        <div className={`${styles.circle} ${styles[cardType]}`}>{data.icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
