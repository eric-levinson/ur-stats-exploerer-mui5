import React from 'react';
import { makeStyles } from '@mui/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const SelectedListItem = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(true);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <List 
      component="nav" 
      aria-label="main mailbox folders"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List>


      <Divider />


      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem 
      button
      selected={selectedIndex === 4}
      onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem 
      button
      selected={selectedIndex === 5}
      onClick={(event) => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem 
      button
      onClick={handleClick}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem 
          button 
          className={classes.nested}
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
    </div>
  );
}
