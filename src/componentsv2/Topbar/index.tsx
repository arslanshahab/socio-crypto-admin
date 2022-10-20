import React, { FC, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileTypes } from '../../types';
import { useHistory } from 'react-router-dom';
import './topbar.scss';
import raiinmakerLogo from '../../assets/png/raiinmaker.png';
// import searchIcon from '../../assets/svg/topbar/searchNormal.svg';
// import notificationIcon from '../../assets/svg/topbar/notification.svg';
import profileIcon from '../../assets/svg/topbar/profileIcon.svg';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import coiinIcon from '../../assets/png/coiin.png';

const Topbar: FC = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: { profile: ProfileTypes }) => state);
  const { push } = useHistory();
  const [coiin, setCoiin] = useState<string>('');

  useEffect(() => {
    ApiClient.getCoiinValue()
      .then((res) => setCoiin(res.coiin))
      .catch((error) => dispatch(showErrorAlert(error)));
  }, []);

  return (
    <div className="topbarWrapper">
      <div className="searchbarWrapper">
        <img src={profile.imageUrl || raiinmakerLogo} alt="Raiinmaker" />
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
          <p>{coiin || ''} USD</p>
        </div>
        <div className="profile" onClick={() => push('/dashboard/profile')}>
          <img src={profileIcon} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
