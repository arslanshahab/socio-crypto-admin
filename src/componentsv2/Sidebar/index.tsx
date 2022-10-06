import React, { FC } from 'react';
import raiinmakerLogo from '../../assets/svg/raiinmaker.svg';
import Divider from '../Divider';
import './sidebar.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';
import { geToolRoutes, getRoutesMapping } from '../../helpers/routesMapping';
import { ProfileTypes } from '../../types';
import dashboardIcon from '../../assets/svg/sidebar/dashbord.svg';
import campaignIcon from '../../assets/svg/sidebar/campaign.svg';
import customerIcon from '../../assets/svg/sidebar/customer.svg';
import cryptoIcon from '../../assets/svg/sidebar/cryptoIcon.svg';
import newCampaignIcon from '../../assets/svg/sidebar/plusIcon.svg';
import adminIcon from '../../assets/svg/sidebar/adminIcon.svg';
import settingIcon from '../../assets/svg/sidebar/settingIcon.svg';
import faqIcon from '../../assets/svg/sidebar/faqIcon.svg';
import supportIcon from '../../assets/svg/sidebar/supportIcon.svg';
import logoutIcon from '../../assets/svg/sidebar/logoutIcon.svg';

interface Map {
  [key: string]: string | undefined;
}

const SidebarIcons: Map = {
  dashboard: dashboardIcon,
  campaign: campaignIcon,
  newCampaign: newCampaignIcon,
  crypto: cryptoIcon,
  admin: adminIcon,
  user: customerIcon,
  setting: settingIcon,
  faq: faqIcon,
  support: supportIcon,
  logout: logoutIcon,
};

const Sidebar: FC = () => {
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const { push } = useHistory();
  const userData = useStoreUserSelector();
  const menuList = getRoutesMapping(userData);
  const toolList = geToolRoutes();
  const { location } = useHistory();

  return (
    <div className="sidebar">
      <div className="imageWrapper">
        <img src={profile.imageUrl || raiinmakerLogo} alt="raiinmaker logo" />
      </div>
      <div className="dividerWrapper">
        <Divider className="divider" />
      </div>
      <p className="title">Menu</p>
      {menuList &&
        menuList.map((item) => {
          if (!item.enabled) return;
          return (
            <div key={item.name} className="menuWrapper">
              <div
                className={`itemsWrapper ${item.to === location.pathname ? 'activeTab' : ''}`}
                onClick={() => push(item.to)}
              >
                <img src={SidebarIcons?.[item.icon]} alt="raiinmaker dashboard" />
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
      <div className="dividerWrapper">
        <Divider className="divider" />
      </div>
      <p className="title">Tools</p>
      {toolList &&
        toolList.map((item) => {
          if (!item.enabled) return;
          return (
            <div key={item.name} className="menuWrapper">
              <div
                className={`itemsWrapper ${item.to === location.pathname ? 'activeTab' : ''}`}
                onClick={
                  item.to
                    ? () => {
                        push(item.to);
                      }
                    : () => {
                        window.open(item.href, '_blank');
                      }
                }
              >
                <img src={SidebarIcons?.[item.icon]} alt="raiinmaker dashboard" />
                <p>{item.name}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Sidebar;
