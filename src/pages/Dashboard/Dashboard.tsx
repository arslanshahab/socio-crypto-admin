import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router';
import CampaignsPage from '../Campaigns';
import { Link } from 'react-router-dom';
// import { MarketData } from '../../components/MarketData';
// import SettingsIcon from '@material-ui/icons/Settings';
import { PaymentsAccount } from '../../components/PaymentsAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Box } from '@material-ui/core';
import { sessionLogout } from '../../clients/raiinmaker-api';
import { Admin } from '../../components/Admin';
import { ManageWithdrawRequests } from '../../components/admin/ManageWithdrawRequests/ManageWithdrawRequests';
import { CampaignAudit } from '../../components/admin/CampaignAudit';
import { UserManagement } from '../../components/UserManagement/UserManagement';
import { CampaignAuditList } from '../../components/admin/CampaignAuditList';
import Sidebar from '../../components/Sidebar';
import styles from './Dashboard.module.scss';
import { DashboardHome } from '../../components/DashboardHome';
import NewCampaignPage from '../NewCampaign';
import { useDispatch } from 'react-redux';
import { showAppLoader } from '../../store/actions/settings';
import EditCampaignPage from '../EditCampaign/EditCampaign';
import { logoutUser } from '../../store/actions/user';
import CoiinLogo from '../../assets/png/coiin.png';
import UserList from '../../components/UserList/UserList';
import UserDetails from '../../components/UserList/UserDetails';
import CampaignTabs from '../../components/Campaigns/CampaignTabs';
import { FaUserCircle } from 'react-icons/fa';
import Profile from '../Profile';
import { ApiClient } from '../../services/apiClient';
import { generateOrgMediaUrl } from '../../helpers/utils';
import { AdminProfileTypes } from '../../types';

const Dashboard: React.FC = (props) => {
  const dispatch = useDispatch();
  const [orgLogo, setOrgLogo] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<AdminProfileTypes>();
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    setLoading(true);
    ApiClient.getProfile()
      .then((res) => {
        setProfile(res.data);
        setIs2FAEnabled(res.data.enabled);
        setOrgLogo(generateOrgMediaUrl(res.data.orgId, res.data.imagePath));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [refetch]);

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
  const callback = () => {
    setRefetch(new Date().getTime());
  };

  return (
    <Box className="box-border w-screen flex flex-row flex-nowrap">
      <Box className={styles.side}>
        <Sidebar orgLogo={orgLogo} />
      </Box>
      <Box className={styles.content}>
        <Box className={styles.topbar}>
          <div className={styles.topbarIcons}>
            <Link className=" text-blue-700 cursor-pointer" to={'/dashboard/paymentsAccount'}>
              <img src={CoiinLogo} alt="raiinmaker-logo" width="50px" />
            </Link>
            <Link to={'/dashboard/profile'}>
              <FaUserCircle fontSize={26} color="gray" />
            </Link>
            <ExitToAppIcon className="text-blue-700 cursor-pointer" onClick={handleLogout} />
          </div>
        </Box>
        <Box className={styles.main}>
          <Switch>
            <ProtectedRoute exact path={'/dashboard'}>
              <DashboardHome />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/campaigns'}>
              <CampaignsPage />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/newCampaign'}>
              <NewCampaignPage {...props} />
            </ProtectedRoute>
            <ProtectedRoute path={'/dashboard/editCampaign/:campaignId'}>
              <EditCampaignPage {...props} />
            </ProtectedRoute>
            {/* <ProtectedRoute exact path={'/dashboard/marketData'}>
                    <MarketData />
                  </ProtectedRoute> */}
            <ProtectedRoute exact path={'/dashboard/paymentsAccount'}>
              <PaymentsAccount />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/userManagement'}>
              <UserManagement {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/management'} adminOnly={true}>
              <Admin {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/withdraw'} adminOnly={true}>
              <ManageWithdrawRequests {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/campaign-audit'}>
              <CampaignAudit {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/audit-campaigns'}>
              <CampaignAuditList {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/userList'}>
              <UserList {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/admin/userDetails/:id'}>
              <UserDetails {...props} />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/campaigns/:id'}>
              <CampaignTabs />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/profile'}>
              <Profile profile={profile} is2FAEnabled={is2FAEnabled} loading={loading} callback={callback} />
            </ProtectedRoute>
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
