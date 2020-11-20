import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import { Switch } from 'react-router';
import { CampaignsList } from '../components/CampaignsList';
import { NewCampaign } from '../components/campaign-create/NewCampaign';
import { Link, useHistory } from 'react-router-dom';
import { MarketData } from '../components/MarketData';
import { DashboardHome } from '../components/DashboardHome';
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { PaymentsAccount } from '../components/PaymentsAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ProtectedRoute, UserContext } from '../components/ProtectedRoute';
import { Button, Grid } from '@material-ui/core';
import { sessionLogout } from '../clients/raiinmaker-api';

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

export const Dashboard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const role = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    const res = await sessionLogout();
    if (res.status === 200) {
      history.push('/');
    } else {
      console.log('ERROR: ', res.body);
    }
  };

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
          <Link to={'/dashboard/campaigns'} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Link>
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
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={'/dashboard/campaigns'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Campaigns'}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary={'Campaigns'} />
            </ListItem>
          </Link>
          <Link to={'/dashboard/marketData'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'MarketData'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={'Market Data'} />
            </ListItem>
          </Link>
          <Link to={'/dashboard/newCampaign'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'New Campaign'}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={'New Campaign'} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
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
            <NewCampaign />
          </ProtectedRoute>
          <ProtectedRoute exact path={'/dashboard/marketData'}>
            <MarketData />
          </ProtectedRoute>
          <ProtectedRoute exact path={'/dashboard/paymentsAccount'}>
            <PaymentsAccount />
          </ProtectedRoute>
        </Switch>
        <Grid container justify={'center'} direction={'row'} spacing={6} className="dashboard-bottom-bar">
          <Grid item>
            <Button size={'small'} href={'https://www.raiinmaker.com/resources/'} className="dashboard-bottom-bar-item">
              <Typography>FAQ</Typography>
            </Button>
          </Grid>
          <Grid item className="dashboard-bottom-bar-item">
            <Button size={'small'} style={{ textTransform: 'none' }} href={'mailto:support@raiinmaker.com'}>
              <Typography>Contact Support</Typography>
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
