import React, { FC } from 'react';
import styles from './statCard.module.css';
import { BsHandIndexThumbFill, BsFillShareFill, BsPeopleFill, BsCashCoin, BsCash } from 'react-icons/bs';
import { FaEye, FaUsersSlash, FaUsers } from 'react-icons/fa';
import { IoSpeedometer } from 'react-icons/io5';
import { FiUsers } from 'react-icons/fi';
import { HiUsers } from 'react-icons/hi';

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
  totalUsers: 'Total Users',
  lastWeekUsers: 'Last Week Users',
  distributedTotalAmount: 'Distributed Amount',
  redeemedTotalAmount: 'Redeemed Amount',
  bannedUsers: 'Banned Users',
};

const countIconMap: { [key: string]: React.ReactNode } = {
  clickCount: <BsHandIndexThumbFill />,
  viewCount: <FaEye />,
  shareCount: <BsFillShareFill />,
  totalParticipants: <BsPeopleFill />,
  participationScore: <IoSpeedometer />,
  totalUsers: <FaUsers />,
  lastWeekUsers: <HiUsers />,
  distributedTotalAmount: <BsCashCoin />,
  redeemedTotalAmount: <BsCash />,
  bannedUsers: <FaUsersSlash />,
};

const StatCard: FC<IProps> = (props: IProps) => {
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
