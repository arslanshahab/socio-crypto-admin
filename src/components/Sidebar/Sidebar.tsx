import React from 'react';
import { Box } from '@material-ui/core';
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { TrendingUp } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { getRoutesMapping } from '../../helpers/routesMapping';
import RaiinmakerLogo from '../../assets/svg/logo.svg';
import styles from './Sidebar.module.scss';
import { useHistory } from 'react-router-dom';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';
import { useSelector } from 'react-redux';
import { ProfileTypes } from '../../types';

const Sidebar: React.FC = () => {
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const userData = useStoreUserSelector();
  const menuList = getRoutesMapping(userData);
  const history = useHistory();
  const pathname = history.location.pathname;

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'store':
        return <StoreIcon />;
      case 'trending':
        return <TrendingUp />;
      case 'add':
        return <AddIcon />;
      case 'assign':
        return <AssignmentIndIcon />;
      case 'assign':
        return <AssignmentIndIcon />;
      case 'user':
        return <PeopleAltIcon />;
      case 'question':
        return <QuestionAnswerIcon />;
      case 'support':
        return <ContactSupportIcon />;
      default:
        return <PeopleAltIcon />;
    }
  };

  return (
    <Box className="w-full pt-20 bg-gradient-to-b from-blue-800 to-gray-900 h-screen">
      <Box className="flex flex-col justify-center items-center w-full">
        <NavLink to={'/dashboard/campaigns'}>
          <img className="w-16" src={profile.imageUrl ? profile.imageUrl : RaiinmakerLogo} alt="raiinmaker" />
        </NavLink>
        <h4 className="text-lg text-gray-300 mt-1 capitalize">{profile.company}</h4>
      </Box>
      <Box className="flex flex-col justify-center items-center pt-20 w-full">
        {menuList.map(
          (item, index) =>
            item.enabled &&
            (item.to ? (
              <NavLink
                key={index}
                to={item.to}
                className="flex flex-row justify-start items-center px-10 py-3 text-md text-gray-200 w-full"
                activeClassName={item.to === pathname ? styles.active : ''}
              >
                {getIcon(item.icon)}
                <span className="ml-3 capitalize">{item.name}</span>
              </NavLink>
            ) : (
              <a
                className="flex flex-row justify-start items-center px-10 py-3 text-mg text-gray-200 w-full"
                key={index}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {getIcon(item.icon)}
                <span className="ml-3 capitalize">{item.name}</span>
              </a>
            )),
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
