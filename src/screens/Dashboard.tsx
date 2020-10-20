import React from 'react';
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
import { Route, Switch } from 'react-router';
import { CampaignsList } from '../components/CampaignsList';
import { NewCampaign } from '../components/campaign-create/NewCampaign';
import { Link } from 'react-router-dom';
import { MarketData } from '../components/MarketData';
import { DashboardHome } from '../components/DashboardHome';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { PaymentsAccount } from '../components/PaymentsAccount';

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Link to={'/dashboard/paymentsAccount'} style={{ color: 'white' }}>
            <SettingsIcon />
          </Link>
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
          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Home'}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>
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
          <Link to={'/dashboard/internal'} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Internal'}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={'Internal'} />
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
          <Route exact path={'/dashboard'}>
            <DashboardHome />
          </Route>
          <Route exact path={'/dashboard/campaigns'}>
            <CampaignsList />
          </Route>
          <Route exact path={'/dashboard/newCampaign'}>
            <NewCampaign />
          </Route>
          <Route exact path={'/dashboard/marketData'}>
            <MarketData />
          </Route>
          <Route exact path={'/dashboard/paymentsAccount'}>
            <PaymentsAccount />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
