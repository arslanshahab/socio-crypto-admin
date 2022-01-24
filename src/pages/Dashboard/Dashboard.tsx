import React from 'react';
import { Switch } from 'react-router';
import CampaignsPage from '../Campaigns';
import { Link, useHistory } from 'react-router-dom';
// import { MarketData } from '../../components/MarketData';
import SettingsIcon from '@material-ui/icons/Settings';
import { PaymentsAccount } from '../../components/PaymentsAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Box } from '@material-ui/core';
import { graphqlClient, sessionLogout } from '../../clients/raiinmaker-api';
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
import { showErrorAlert } from '../../store/actions/alerts';
import EditCampaignPage from '../EditCampaign/EditCampaign';
import { logoutUser } from '../../store/actions/user';
import CoiinLogo from '../../assets/png/coiin.png';

const Dashboard: React.FC = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(showAppLoader({ flag: true, message: 'Ending your session!' }));
    const res = await sessionLogout();
    if (res.status === 200) {
      await graphqlClient.clearStore();
      history.push('/');
      dispatch(logoutUser());
      dispatch(showAppLoader({ flag: false, message: '' }));
    } else {
      console.log('ERROR: ', res.body);
      dispatch(showAppLoader({ flag: false, message: '' }));
      dispatch(showErrorAlert('There was an error logging while you out'));
    }
  };

  return (
    <Box className="box-border w-screen flex flex-row flex-nowrap">
      <Box className={styles.side}>
        <Sidebar />
      </Box>
      <Box className={styles.content}>
        <Box className={styles.topbar}>
          <Link className="mr-2 text-blue-700 cursor-pointer" to={'/dashboard/paymentsAccount'}>
            <img src={CoiinLogo} alt="raiinmaker-logo" width="50px" height="50px" />
          </Link>
          <ExitToAppIcon className="text-blue-700 cursor-pointer" onClick={handleLogout} />
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
          </Switch>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
