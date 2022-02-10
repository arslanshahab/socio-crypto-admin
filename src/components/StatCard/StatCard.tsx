import React from 'react';
import styles from './statCard.module.css';
import { BsHandIndexThumbFill, BsFillShareFill, BsPeopleFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { IoSpeedometer } from 'react-icons/io5';
interface IProps {
  type: string;
  count?: string[];
}

const countTitleMap: { [key: string]: string } = {
  clickCount: 'Clicks',
  viewCount: 'Views',
  shareCount: 'Shares',
  totalParticipants: 'Participants',
  participationScore: 'Participation Score',
};

const countIconMap: { [key: string]: React.ReactNode } = {
  clickCount: <BsHandIndexThumbFill />,
  viewCount: <FaEye />,
  shareCount: <BsFillShareFill />,
  totalParticipants: <BsPeopleFill />,
  participationScore: <IoSpeedometer />,
};

const StatCard = (props: IProps) => {
  const { type, count } = props;
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
