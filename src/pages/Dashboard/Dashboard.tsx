import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { Switch } from 'react-router';
import { CampaignsList } from '../../components/CampaignsList';
import { NewCampaign } from '../../components/campaign-create/NewCampaign';
import { Link, useHistory } from 'react-router-dom';
import { MarketData } from '../../components/MarketData';
import { DashboardHome } from '../../components/DashboardHome';
import SettingsIcon from '@material-ui/icons/Settings';
import { PaymentsAccount } from '../../components/PaymentsAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ProtectedRoute, UserContext } from '../../components/ProtectedRoute';
import { Box } from '@material-ui/core';
import { graphqlClient, sessionLogout } from '../../clients/raiinmaker-api';
import { Admin } from '../../components/Admin';
import { ManageWithdrawRequests } from '../../components/admin/ManageWithdrawRequests';
import { CampaignAudit } from '../../components/admin/CampaignAudit';
import { UserManagement } from '../../components/UserManagement';
import { CampaignAuditList } from '../../components/admin/CampaignAuditList';
import Sidebar from '../../components/Sidebar';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = (props) => {
  const [open, setOpen] = React.useState(true);

  const history = useHistory();

  const handleLogout = async () => {
    const res = await sessionLogout();
    if (res.status === 200) {
      await graphqlClient.clearStore();
      history.push('/');
    } else {
      console.log('ERROR: ', res.body);
    }
  };

  return (
    <UserContext.Consumer>
      {(value) => {
        return (
          <Box className="box-border w-screen flex flex-row flex-nowrap">
            <Box className={styles.side}>
              <Sidebar value={value} />
            </Box>
            <Box className={styles.content}>
              <Box className="w-full flex flex-row justify-end items-center px-4 py-3 bg-gray-100 mb-10">
                <Link className="mr-2" to={'/dashboard/paymentsAccount'}>
                  <SettingsIcon />
                </Link>
                <IconButton onClick={handleLogout}>
                  <ExitToAppIcon />
                </IconButton>
              </Box>
              <Box className="w-full">
                <Switch>
                  <ProtectedRoute exact path={'/dashboard'}>
                    <DashboardHome />
                  </ProtectedRoute>
                  <ProtectedRoute exact path={'/dashboard/campaigns'}>
                    <CampaignsList />
                  </ProtectedRoute>
                  <ProtectedRoute exact path={'/dashboard/newCampaign'}>
                    <NewCampaign userData={value} {...props} />
                  </ProtectedRoute>
                  <ProtectedRoute exact path={'/dashboard/marketData'}>
                    <MarketData />
                  </ProtectedRoute>
                  <ProtectedRoute exact path={'/dashboard/paymentsAccount'}>
                    <PaymentsAccount />
                  </ProtectedRoute>
                  {value['role'] === 'admin' && (
                    <ProtectedRoute exact path={'/dashboard/admin/userManagement'}>
                      <UserManagement {...props} />
                    </ProtectedRoute>
                  )}
                  {value['company'] === 'raiinmaker' && (
                    <ProtectedRoute exact path={'/dashboard/admin/management'} adminOnly={true}>
                      <Admin {...props} />
                    </ProtectedRoute>
                  )}
                  {value['company'] === 'raiinmaker' && (
                    <ProtectedRoute exact path={'/dashboard/admin/withdraw'} adminOnly={true}>
                      <ManageWithdrawRequests {...props} />
                    </ProtectedRoute>
                  )}
                  {value['role'] === 'admin' && (
                    <ProtectedRoute exact path={'/dashboard/admin/campaign-audit'}>
                      <CampaignAudit {...props} />
                    </ProtectedRoute>
                  )}
                  {value['role'] === 'admin' && (
                    <ProtectedRoute exact path={'/dashboard/admin/audit-campaigns'}>
                      <CampaignAuditList {...props} />
                    </ProtectedRoute>
                  )}
                </Switch>
              </Box>
            </Box>
          </Box>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Dashboard;
