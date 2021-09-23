import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SimpleTabs } from './Tabs';
import { GroupList } from '../data/GroupList';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));


export const ClippedDrawer = (e) => {
  const classes = useStyles();

  console.log(e.origin)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Explore - View
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        
        <div className={classes.drawerContainer}>
        <GroupList id={e.origin} />
        </div>
      </Drawer>
      <div className={classes.content}>
      <Toolbar />
      <SimpleTabs/>
      </div>
    </div>
  );
}
