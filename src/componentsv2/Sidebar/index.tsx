import React, { FC } from 'react';
import raiinmakerLogo from '../../assets/svg/raiinmaker.svg';
import Divider from '../Divider';
import './sidebar.scss';
import dashboardIcon from '../../assets/svg/sidebar/dashbord.svg';

const Sidebar: FC = () => {
  return (
    <div className="sidebar">
      <div className="imageWrapper">
        <img src={raiinmakerLogo} alt="raiinmaker logo" />
      </div>
      <div className="dividerWrapper">
        <Divider className="divider" />
      </div>
      <p className="menu">Menu</p>
      <div className="menuWrapper">
        <img src={dashboardIcon} alt="raiinmaker dashboard" />
        <p>Dashboard</p>
      </div>
    </div>
  );
};

export default Sidebar;
