import React, { FC } from 'react';
import raiinmakerLogo from '../../assets/svg/raiinmaker.svg';
import Divider from '../Divider';
import './sidebar.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';
import { geToolRoutes, getRoutesMapping } from '../../helpers/routesMapping';
import { ProfileTypes } from '../../types';
import { useDispatch } from 'react-redux';
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
import { showAppLoader } from '../../store/actions/settings';
import { logoutUser } from '../../store/actions/user';
import { sessionLogout } from '../../clients/raiinmaker-api';

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
};

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const { push } = useHistory();
  const userData = useStoreUserSelector();
  const menuList = getRoutesMapping(userData);
  const toolList = geToolRoutes();
  const { location } = useHistory();

  const handleLogout = async () => {
    try {
      dispatch(showAppLoader({ flag: true, message: 'Ending your session!' }));
      dispatch(logoutUser());
      await sessionLogout();
      dispatch(showAppLoader({ flag: false, message: '' }));
    } catch (error) {
      dispatch(showAppLoader({ flag: false, message: '' }));
    }
  };

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
      <div className="menuWrapper">
        <div className="itemsWrapper" onClick={() => handleLogout()}>
          <img src={logoutIcon} alt="raiinmaker dashboard" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
