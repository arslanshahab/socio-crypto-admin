import React from 'react';
import styles from './statCard.module.css';
import { BsHandIndexThumbFill, BsFillShareFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';

interface IProps {
  type: string;
  count: string[];
}

const countTitleMap: { [key: string]: string } = {
  clickCount: 'Clicks',
  viewCount: 'Views',
  shareCount: 'Shares',
  participationScore: 'Participation Score',
  rewards: 'Rewards',
};

const countIconMap: { [key: string]: React.ReactNode } = {
  clickCount: <BsHandIndexThumbFill />,
  viewCount: <FaEye />,
  shareCount: <BsFillShareFill />,
  totalParticipationScore: <BsFillShareFill />,
  rewards: <SiCashapp />,
};

const StatCard = (props: IProps) => {
  const { type, count } = props;
  console.log('StatCard', count);

  return (
    <div className={styles.statCardWrapper}>
      <p className={styles.analyticsName}>{countTitleMap[type]}</p>
      <div className={styles.analyticsNumberIcon}>
        <h2 className={styles.analyticsNumber}>{count || 0}</h2>
        <div className={`${styles.campaignIcon} ${styles[type]}`}>{countIconMap[type]}</div>
      </div>
    </div>
  );
};

export default StatCard;
