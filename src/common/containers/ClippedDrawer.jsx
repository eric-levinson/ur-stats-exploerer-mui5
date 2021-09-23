import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LanguageIcon from '@mui/icons-material/Language';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton'
import { AltReq, UrlParse } from '../../utils/AltReq';
import { ExploreTabs } from '../components/nav/ExploreTabs';
import DateRangeIcon from '@mui/icons-material/DateRange';

const drawerWidth = 240;

export const ClippedDrawer = () => {
    // eslint-disable-next-line
    const [active, setActive] = React.useState() // eslint-disable-next-line
    const [season, setSeason] = React.useState() // eslint-disable-next-line
    const [leagues, setLeagues] = React.useState() // eslint-disable-next-line
    const [week, setWeek] = React.useState() // eslint-disable-next-line
    const [match, setMatch] = React.useState() // eslint-disable-next-line
    const [games, setGames] = React.useState() // eslint-disable-next-line
    const [selected, setSelected] = React.useState() // eslint-disable-next-line
    const [open, setOpen] = React.useState({ season: true, leagues: true, weeks: true, matches: true });

    const Updater = props => {
        //console.log(props)
        let url = UrlParse(props.id, 'group-list')
        const req = AltReq(url)
        switch (props.type) {
            case 'season':
                //console.log('season')
                req.then(res => {
                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setLeagues(res.data.list)
                    //console.log(res.data.list)//res.data.list[0].id)
                })
                setSeason(props)
                setWeek()
                setActive({ season: props, league: undefined, week: undefined, match: undefined, games: undefined })
                //console.log(active)
                break;
            case 'league':
                //console.log('league')
                req.then(res => {
                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setWeek(res.data.list)
                    //console.log(res.data.list)
                })
                setActive({ season: active.season, league: props, week: undefined, match: undefined, games: undefined })
                //console.log(active)
                break;
            case 'week':
                //console.log('week')
                req.then(res => {
                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setMatch(res.data.list)
                    //console.log(res.data.list)
                })
                setActive({ season: active.season, league: active.league, week: props, match: undefined, games: undefined })
                //console.log(active)
                break;
            case 'match':
                req.then(res => {
                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setGames(res.data.list)
                    console.log(res.data.list)
                })
                setActive({...active, match: props, })
                console.log(active)
                break;
            default:
                console.log('default')
        }
    }

    const handleListItemClick = (event, index, active) => {
        //console.log(active)
        setSelected(active)
        Updater(active)
        //console.log(active)
    };

    const handleClick = props => {
        //console.log(props)
        setOpen(props);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Explore - {active && active.season !== undefined ? active.season.name : 'Pick a season'} {active && active.league !== undefined ? ' - ' + active.league.name : null} {active && active.week !== undefined ? ' - ' + active.week.name : null} {active && active.match !== undefined ? ' - ' + active.match.name : null}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <ListItemButton value="seasons" onClick={event => handleClick({ ...open, season: !open.season })}>
                        <ListItemText primary="Seasons" />
                        {open.season ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open.season} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                onClick={(event) => handleListItemClick(event, 0, { name: 'Season 10', id: 'season-10-j1nooa6jlw', type: 'season' })}
                            >
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Season 10" id='season-10-j1nooa6jlw' />
                            </ListItemButton>

                            <ListItemButton
                                sx={{ pl: 4 }}
                                // eslint-disable-next-line react/jsx-no-duplicate-props
                                onClick={(event) => handleListItemClick(event, 1, { name: 'Season 11', id: 'season-11-phqfzmk1fq', type: 'season' })}
                            >
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Season 11" id='season-11-phqfzmk1fq' />
                            </ListItemButton>
                        </List>

                    </Collapse>
                    <Divider />

                    {leagues !== undefined ? <div>
                        <ListItemButton value="leagues" onClick={event => handleClick({ ...open, leagues: !open.leagues })}>
                            <ListItemText primary="Leagues" />
                            {open.league ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.leagues} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {leagues.map((item, i) => <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={(event) => handleListItemClick(event, i++, { name: item.name, id: item.id, type: 'league' })}
                                >
                                    <ListItemIcon>
                                        <GroupsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }

                    {week !== undefined ? <div>
                        <ListItemButton value="weeks" onClick={event => handleClick({ ...open, weeks: !open.weeks })}>
                            <ListItemText primary="Weeks" />
                            {open.weeks ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.weeks} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {week.map((item, i) => <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={(event) => handleListItemClick(event, i++, { name: item.name, id: item.id, type: 'week' })}
                                >
                                    <ListItemIcon>
                                        <DateRangeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }

                    {match !== undefined ? <div>
                        <ListItemButton value="matches" onClick={event => handleClick({ ...open, matches: !open.matches })}>
                            <ListItemText primary="Matches" />
                            {open.matches ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.matches} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {match.map((item, i) => <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={(event) => handleListItemClick(event, i++, { name: item.name, id: item.id, type: 'match' })}
                                >
                                    <ListItemIcon>
                                        <GroupsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }


                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, }}>
                <Toolbar />
                {active !== undefined ? <ExploreTabs active={active} selected={selected} /> : null}
            </Box>
        </Box>
    );
}
