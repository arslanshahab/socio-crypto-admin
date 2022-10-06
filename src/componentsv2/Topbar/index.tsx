import React, { FC } from 'react';
import ReactSelect from 'react-select';
import { useSelector } from 'react-redux';
import { ProfileTypes } from '../../types';
import './topbar.scss';
import raiinmakerLogo from '../../assets/png/raiinmaker.png';
import searchIcon from '../../assets/svg/topbar/searchNormal.svg';
import notificationIcon from '../../assets/svg/topbar/notification.svg';
import profileIcon from '../../assets/svg/topbar/profileIcon.svg';

const Topbar: FC = () => {
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  return (
    <div className="topbarWrapper">
      <div className="searchbarWrapper">
        <img src={profile.imageUrl || raiinmakerLogo} alt="Raiinmaker" />
        <ReactSelect placeholder="Search" />
      </div>
      <div className="iconWrapper">
        <div className="search">
          <img src={searchIcon} />
        </div>
        <div className="notification">
          <img src={notificationIcon} />
        </div>
        <div className="profile">
          <img src={profileIcon} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
