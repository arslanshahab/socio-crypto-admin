import React, { FC, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { CoiinReducerTypes } from '../../types';
import { useHistory } from 'react-router-dom';
import './topbar.scss';
import raiinmakerLogo from '../../assets/png/raiinmaker.png';
// import searchIcon from '../../assets/svg/topbar/searchNormal.svg';
// import notificationIcon from '../../assets/svg/topbar/notification.svg';
import profileIcon from '../../assets/svg/topbar/profileIcon.svg';
import coiinIcon from '../../assets/png/coiin.png';
import { fetchCoiinValue } from '../../store/middlewares';

const Topbar: FC = () => {
  const dispatch = useDispatch();
  const { coiinValue } = useSelector((state: { coiin: CoiinReducerTypes }) => state.coiin);
  const { push } = useHistory();

  useEffect(() => {
    dispatch(fetchCoiinValue());
  }, []);

  return (
    <div className="topbarWrapper">
      <div className="searchbarWrapper">
        <img src={raiinmakerLogo} alt="Raiinmaker" />
        <ReactSelect placeholder="Search" />
      </div>
      <div className="iconWrapper">
        {/* <div className="search">
          <img src={searchIcon} />
        </div>
        <div className="notification">
          <img src={notificationIcon} />
        </div> */}
        <div className="coiinValue">
          <img src={coiinIcon} />
          <p>{coiinValue || ''} USD</p>
        </div>
        <div className="profile" onClick={() => push('/dashboard/profile')}>
          <img src={profileIcon} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
