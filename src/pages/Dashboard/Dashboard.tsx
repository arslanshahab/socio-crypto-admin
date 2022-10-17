import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import CampaignsPage from '../Campaigns';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Admin } from '../../components/Admin';
import { ManageWithdrawRequests } from '../../components/admin/ManageWithdrawRequests/ManageWithdrawRequests';
import { CampaignAudit } from '../../components/admin/CampaignAudit';
import { UserManagement } from '../../components/UserManagement/UserManagement';
import { CampaignAuditList } from '../../components/admin/CampaignAuditList';
import './dashboard.scss';
import NewCampaignPage from '../NewCampaign';
import { useDispatch } from 'react-redux';
import EditCampaignPage from '../EditCampaign/EditCampaign';
import UserList from '../../components/UserList/UserList';
import UserDetails from '../../components/UserList/UserDetails';
import CampaignTabs from '../../components/Campaigns/CampaignTabs';
import Profile from '../Profile';
import { ApiClient } from '../../services/apiClient';
import { getProfile } from '../../store/actions/profile';
import DashboardHome from '../DashboardHome';
import CampaignAnalytics from '../CampaignAnalytics';
import Payments from '../Payments';
import Sidebar from '../../componentsv2/Sidebar';
import Topbar from '../../componentsv2/Topbar';
import CampaignTier from '../../componentsv2/CampaignTier';

const Dashboard: React.FC = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    ApiClient.getProfile()
      .then((res) => {
        dispatch(getProfile(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">
      <aside className="side">
        <Sidebar />
      </aside>
      <div className="content">
        <div className="topbar">
          <Topbar />
        </div>
        <div className="main">
          <Switch>
            <ProtectedRoute exact path={'/dashboard'}>
              <DashboardHome />
            </ProtectedRoute>
            {/* <ProtectedRoute exact path={'dashboard/v2'}>
              <DashboardHomeV2 />
            </ProtectedRoute> */}
            <ProtectedRoute exact path={'/dashboard/campaigns'}>
              <CampaignsPage />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/analytics'}>
              <CampaignAnalytics />
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
              <Payments />
            </ProtectedRoute>
            {/* <ProtectedRoute exact path={'/dashboard/paymentsAccount'}>
              <PaymentsAccount />
            </ProtectedRoute> */}
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
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path={'/dashboard/tier/:slug'}>
              <CampaignTier />
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
