import React, { FC } from 'react';
import styles from './statCard.module.css';
import { ReactComponent as ClickIcon } from '../../assets/svg/clickIcon.svg';
import { ReactComponent as ViewIcon } from '../../assets/svg/viewIcon.svg';
import { ReactComponent as ShareIcon } from '../../assets/svg/shareIcon.svg';

interface IProps {
  name: string;
  count: string;
}

const titles: { [key: string]: string } = {
  clickCount: 'clickCount',
  viewCount: 'viewCount',
  shareCount: 'shareCount',
};

const icons: { [key: string]: React.ReactNode } = {
  clickCount: <ClickIcon />,
  viewCount: <ViewIcon />,
  shareCount: <ShareIcon />,
};

const StatCard: FC<IProps> = ({ name, count }: IProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div>
        <div className={styles.titleWithIcon}>
          <div className={styles.icons}>{icons[name]}</div>
          <p>{titles[name]}</p>
        </div>
        <div className={styles.countWrapper}>
          <div>&uarr;</div>
          <div>{count}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
