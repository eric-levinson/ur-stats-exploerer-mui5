import * as React from 'react';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import { AltReq, UrlParse } from '../../utils/AltReq';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GamesIcon from '@mui/icons-material/Games';
import { DataContext } from '../components/control/DataContext';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import _ from 'lodash'
import { ColorTabs } from '../components/nav/MatchComponent';

import { useParams } from 'react-router-dom';
import { ListItemAvatar } from '@mui/material';
import { display } from '@mui/system';

const drawerWidth = 300;

function NoneSelected() {
    return (
        <div sx={{
            padding: 2,
        }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <h2>Select a Sub-Group</h2>
            </Grid>
        </div>
    )
}


export const GroupDrawer = props => {
    // eslint-disable-next-line

    const { id } = useParams();

    const initialstate = {
        group_data: {
            id: undefined,
            name: undefined,
            open: false,
        }
    }

    const [state, setState] = React.useState(initialstate);
    const [open, setOpen] = React.useState(true);
    const [selected, setSelected] = React.useState({
        data: {
            id: undefined,
        },
    });


    const bcReq = type => AltReq(UrlParse(id, type));


    React.useEffect(() => {
        bcReq('group-list').then(res => {
            let gData = res.data

            //setState({...state, group_data: {...state.group_data, ...{groups: res.data}}})
            bcReq('group-stats').then(res => {
                setState({ ...state, group_data: { ...state.group_data, ...gData, ...res.data } })
            });
        });

    }, [id]);

    const handleSelect = props => {

        if (props.group.direct_replays > 0 || props.group.indirect_replays > 0) {

            setSelected({ id: props.id, data: props.group })

            bcReq('group-list').then(res => {
                let gData = res.data

                //setState({...state, group_data: {...state.group_data, ...{groups: res.data}}})
                bcReq('group-stats').then(res => {
                    setSelected({ ...selected, data: props.group,  ...gData, ...res.data   })
                });
            });
            
            
        } else {
            setSelected({ id: props.id, data: props.group })
        }
    }
    console.log(selected)

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        sx={{
                            mr: 2,
                            display: state.group_data.list !== undefined && state.group_data.list.length !== 0 ? 'flex' : 'none'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Group Explore - {state.group_data.name !== undefined ? state.group_data.name : id}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    display: state.group_data.list !== undefined && state.group_data.list.length !== 0 && open ? 'flex' : 'none',
                    visibility: open ? 'visible' : 'hidden',
                    opacity: open ? 1 : 0,
                    transition: 'visibility 0s, opacity 0.5s linear, display 1s linear'

                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>

                    <ListItemButton value={state.group_data.name !== undefined ? state.group_data.name : id} onClick={() => setState({ ...state, group_data: { ...state.group_data, open: !state.group_data.open } })}>
                        <ListItemText primary={state.group_data.name !== undefined ? state.group_data.name : id} secondary={state.group_data.list !== undefined ? 'Sub-Groups: ' + state.group_data.list.length : null} />
                        {state.group_data.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={state.group_data.open} timeout="auto" unmountOnExit>
                        <List dense={true} component="div" disablePadding>

                            {state.group_data.list !== undefined ? state.group_data.list.map((group, index) => (
                                <ListItemButton
                                    id={group.id}
                                    name={group.name}
                                    value={group.id}
                                    sx={{ pl: 4 }}
                                    key={index}
                                    selected={typeof selected.data.id !== undefined && selected.data.id === group.id ? true : false}
                                    onClick={() => handleSelect({ id: group.id, group: group })}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt="" src={group.user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={group.name} secondary={
                                        <React.Fragment>
                                            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                                                Direct Replays: {group.direct_replays}<br />
                                                Indirect Replays: {group.indirect_replays}<br />
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                </ListItemButton>
                            )) : null}


                        </List>

                    </Collapse>
                    <Divider />

                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, }}>
                <Toolbar />

                {/*selected !== undefined ? <DataContext active={active} selected={selected} series={seriesData} />  : <NoneSelected/>*/}

            </Box>
        </Box>
    );
}
