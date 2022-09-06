import React, { FC } from 'react';
import styles from './customCard.module.css';
import { ReactComponent as RedeemedIcon } from '../../assets/svg/dashboardIcons/amountIcon.svg';
import { ReactComponent as BannedUserIcon } from '../../assets/svg/dashboardIcons/bannedIcon.svg';
import { ReactComponent as ClickIcon } from '../../assets/svg/dashboardIcons/clickIcon.svg';
import { ReactComponent as ParticipantsIcon } from '../../assets/svg/dashboardIcons/participantIcon.svg';
import { ReactComponent as DistributedCashIcon } from '../../assets/svg/dashboardIcons/cashIcon.svg';
import { ReactComponent as ParticipantScoreIcon } from '../../assets/svg/dashboardIcons/scoreIcon.svg';
import { ReactComponent as ViewIcon } from '../../assets/svg/dashboardIcons/viewIcon.svg';
import { ReactComponent as ShareIcon } from '../../assets/svg/dashboardIcons/shareIcon.svg';
import { ReactComponent as UsersIcon } from '../../assets/svg/dashboardIcons/usersIcon.svg';

interface ICustomCardProps {
  title: string;
  count?: string;
}

const titles: { [key: string]: string } = {
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

const icons: { [key: string]: React.ReactNode } = {
  clickCount: <ClickIcon />,
  viewCount: <ViewIcon />,
  shareCount: <ShareIcon />,
  totalParticipants: <ParticipantsIcon />,
  participationScore: <ParticipantScoreIcon />,
  totalUsers: <UsersIcon />,
  //   lastWeekUsers: <HiUsers />,
  distributedTotalAmount: <DistributedCashIcon />,
  redeemedTotalAmount: <RedeemedIcon />,
  bannedUsers: <BannedUserIcon />,
};

const CustomCard: FC<ICustomCardProps> = ({ title, count }: ICustomCardProps) => {
  return (
    <div className={styles.customCard}>
      <p>{titles[title]}</p>
      <div className={styles.countWrapper}>
        <h3>{count || '0'}</h3>
        <div>{icons[title]}</div>
      </div>
    </div>
  );
};

export default CustomCard;
