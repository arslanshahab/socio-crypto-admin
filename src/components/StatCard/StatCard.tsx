import React from 'react';
import styles from './statCard.module.css';
import { StateCardDataType } from '../DashboardHome';
import { useQuery, gql } from '@apollo/client';

interface IProps {
  compaignData: StateCardDataType;
  cardType: string;
}

const StatCard = (props: IProps) => {
  const { compaignData, cardType } = props;

  return (
    <div className={styles.statCardWrapper}>
      <p className={styles.textSm}>{compaignData.title}</p>
      <div className={styles.contentCircle}>
        <h2 className={styles.textLg}>{compaignData.numbers !== 'undefined' ? compaignData.numbers : '0'}</h2>
        <div className={`${styles.circle} ${styles[cardType]}`}>{compaignData.icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
