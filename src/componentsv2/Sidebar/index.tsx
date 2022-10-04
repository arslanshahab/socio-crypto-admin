import React, { FC } from 'react';
import raiinmakerLogo from '../../assets/svg/raiinmaker.svg';
import Divider from '../Divider';
import './sidebar.scss';
import { useSelector } from 'react-redux';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';
import { getRoutesMapping } from '../../helpers/routesMapping';
import { useHistory } from 'react-router';
import { ProfileTypes } from '../../types';
import dashboardIcon from '../../assets/svg/sidebar/dashbord.svg';
import campaignIcon from '../../assets/svg/sidebar/campaign.svg';
import customerIcon from '../../assets/svg/sidebar/customer.svg';
import orderIcon from '../../assets/svg/sidebar/order.svg';
import messageIcon from '../../assets/svg/sidebar/message.svg';

interface Map {
  [key: string]: string | undefined;
}

const SidebarIcons: Map = {
  dashboard: dashboardIcon,
  campaign: campaignIcon,
  user: customerIcon,
};

const Sidebar: FC = () => {
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const userData = useStoreUserSelector();
  const menuList = getRoutesMapping(userData);
  const { location } = useHistory();

  return (
    <div className="sidebar">
      <div className="imageWrapper">
        <img src={raiinmakerLogo} alt="raiinmaker logo" />
      </div>
      <div className="dividerWrapper">
        <Divider className="divider" />
      </div>
      <p className="menu">Menu</p>
      {menuList &&
        menuList.map((item) => {
          if (!item.enabled) return;
          return (
            <div className={`menuWrapper ${item.to === location.pathname ? 'activeTab' : ''}`} key={item.name}>
              <img src={SidebarIcons?.[item.icon] || messageIcon} alt="raiinmaker dashboard" />
              <p>{item.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Sidebar;
