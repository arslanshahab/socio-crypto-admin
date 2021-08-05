import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
import { Button, Grid, Box } from '@material-ui/core';
import { graphqlClient, sessionLogout } from '../../clients/raiinmaker-api';

import { Admin } from '../../components/Admin';
import { ManageWithdrawRequests } from '../../components/admin/ManageWithdrawRequests';
import { CampaignAudit } from '../../components/admin/CampaignAudit';
import { UserManagement } from '../../components/UserManagement';
import { CampaignAuditList } from '../../components/admin/CampaignAuditList';
import Sidebar from '../../components/Sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const Dashboard: React.FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Grid container direction={'row'} justify={'flex-end'}>
                  <Grid item>
                    <Button style={{ backgroundColor: 'transparent' }}>
                      <Link to={'/dashboard/paymentsAccount'} style={{ color: 'white' }}>
                        <SettingsIcon />
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: 'white' }}>
                      <ExitToAppIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            <Box className="w-72">
              <Sidebar value={value} />
            </Box>

            <main
              className={`${clsx(classes.content, {
                [classes.contentShift]: open,
              })} relative full-screen-height
              `}
            >
              <div className={classes.drawerHeader} />
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
            </main>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export default Dashboard;
