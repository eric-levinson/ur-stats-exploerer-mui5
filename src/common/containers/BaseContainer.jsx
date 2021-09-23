import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListSubheader from '@mui/material/ListSubheader'
//import DraftsIcon from '@mui/icons-material/Drafts';

import {// eslint-disable-next-line
    useParams,// eslint-disable-next-line
    useRouteMatch
} from "react-router-dom";
import { AltReq, UrlParse } from '../../utils/AltReq';
import { TableComp } from '../components/data/TableComp';

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
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    content: {
        flexGrow: 1,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    dNone: {
        display: 'none'
    },
}));




export const BaseContainer = (e) => {
    const classes = useStyles();
    const [active, setActive] = React.useState() // eslint-disable-next-line
    const [season, setSeason] = React.useState() // eslint-disable-next-line
    const [leagues, setLeagues] = React.useState() // eslint-disable-next-line
    const [week, setWeek] = React.useState() // eslint-disable-next-line
    const [match, setMatch] = React.useState() // eslint-disable-next-line
    const [selected, setSelected] = React.useState()
    const [open, setOpen] = React.useState(true);

    const Updater = props => {
        //console.log(props)
        let url = UrlParse(props.id, 'group-list')
        const req = AltReq(url)
        switch (props.type) {
            case 'season':
                //console.log('season')
                req.then(res => {
                    setLeagues(res.data.list)
                    //console.log(res.data.list[0].id)
                })
                setSeason(props)
                setWeek()
                setActive({season: props, league: undefined, week: undefined, match: undefined})
                //console.log(active)
                break;
            case 'league':
                //console.log('league')
                req.then(res => {
                    setWeek(res.data.list)
                    //console.log(res.data.list)
                })
                setActive({season: active.season, league: props, week: undefined, match: undefined})
                //console.log(active)
                break;
            case 'week':
                //console.log('week')
                req.then(res => {
                    setMatch(res.data.list)
                    //console.log(res.data.list)
                })
                setActive({season: active.season, league: active.league, week: props, match: undefined})
                //console.log(active)
                break;
            case 'match':
                //console.log('match')
                setMatch(props)
                break;
            default:
                console.log('default')
        }
    }

    const handleListItemClick = (event, index, active) => {
        //console.log(active)
        handleClick()
        setSelected(active)
        Updater(active)
        //console.log(active)
    };

    const handleClick = () => {
        setOpen(!open);
    };


    //console.log(e)
    //console.log(path)
    //console.log(url)
    //console.log(id)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Explore - {active && active.season !== undefined ? active.season.name : 'Pick a season' } {active && active.league !== undefined ? ' - ' + active.league.name : null} {active && active.week !== undefined ? ' - ' + active.week.name : null}
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
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Seasons
                            </ListSubheader>
                        }
                        className={classes.drawerContainer}
                    >
                        <ListItem
                            button

                            
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onClick={(event) => handleListItemClick(event, 0, { name: 'Season 10', id: 'season-10-j1nooa6jlw', type: 'season' })}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Season 10" id='season-10-j1nooa6jlw' />
                        </ListItem>


                        <ListItem
                            button
                            
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            onClick={(event) => handleListItemClick(event, 1, { name: 'Season 11', id: 'season-11-phqfzmk1fq', type: 'season' })}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Season 11" id='season-11-phqfzmk1fq' />
                            {/*open ? <ExpandLess /> : <ExpandMore />*/}
                        </ListItem>
                        {/*
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    button
                                    className={classes.nested}
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItem>
                            </List>
                        </Collapse>*/}
                    </List>

                    <Divider />
                    
                    
                    { leagues !== undefined ? <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                League
                            </ListSubheader>
                        }
                        component="nav"
                        aria-label="main mailbox folders"
                        className={''/*classes.dNone*/}
                    >
                        {leagues.map((item, i) => <ListItem
                            button
                            
                            onClick={(event) => handleListItemClick(event, i++, {name: item.name, id: item.id, type: 'league'})}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>    
                        )}
                    </List> : null
                    }

                    { week !== undefined ? <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Weeks
                            </ListSubheader>
                        }
                        component="nav"
                        aria-label="main mailbox folders"
                        className={''/*classes.dNone*/}
                    >
                        {week.map((item, i) => <ListItem
                            button
                            
                            onClick={(event) => handleListItemClick(event, i++, {name: item.name, id: item.id, type: 'week'})}
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>    
                        )}
                    </List> : null
                    }

                    <Divider />

                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {active !== undefined ? <TableComp active={active} selected={selected} /> : null}
            </main>
        </div>
    );
}
