import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton'
import { AltReq, UrlParse } from '../../utils/AltReq';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GamesIcon from '@mui/icons-material/Games';
import { DataContext } from '../components/control/DataContext';
import TextField from '@mui/material/TextField';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import _ from 'lodash'
import { ColorTabs } from '../components/nav/MatchComponent';


const drawerWidth = 240;

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
                <h2>Select a Season and League</h2>
            </Grid>
        </div>
    )
}


const initialstate = {
    active: undefined,
    season: undefined,
    leagues: undefined,
    week: undefined,
    match: undefined,
    games: undefined,
    seriesData: undefined,
    selected: undefined,
    open: { season: true, leagues: true, weeks: true, matches: true, games: true }
}

export const ClippedDrawer = () => {
    // eslint-disable-next-line
    const [drawerState, setDrawerState] = React.useState(initialstate) //eventually I would like to full transition to this approach. New state data will be using this.
    const [active, setActive] = React.useState() // eslint-disable-next-line
    const [season, setSeason] = React.useState() // eslint-disable-next-line
    const [leagues, setLeagues] = React.useState() // eslint-disable-next-line
    const [week, setWeek] = React.useState() // eslint-disable-next-line
    const [match, setMatch] = React.useState() // eslint-disable-next-line
    const [games, setGames] = React.useState() // eslint-disable-next-line
    const [seriesData, setSeriesData] = React.useState()// eslint-disable-next-line
    const [selected, setSelected] = React.useState() // eslint-disable-next-line
    const [open, setOpen] = React.useState({ season: true, leagues: true, weeks: true, matches: true, games: true });

    const DataRelay = props => {
        //console.log(props)
        let url = UrlParse(props.id, 'group-stats')
        //setSelected(props)
        const req = AltReq(url)
        req.then(res => {
            setSelected({ ...selected, name: props.name, id: props.id, type: props.type, data: res.data })
            //setActive({...active, data: res.data})
            //console.log(selected)
        })
    }

    const Updater = props => {
        console.log(props)
        let url = UrlParse(props.id, 'group-list')
        const req = AltReq(url)
        switch (props.type) {
            case 'season':
                req.then(res => {

                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setLeagues(res.data.list)
                    //res.data.list[0].id)
                })
                setSeason(props)
                //setSelected(props)
                setWeek()
                setMatch()
                setSeriesData()
                setActive({ season: props, league: undefined, week: undefined, match: undefined, games: undefined })
                //console.log(active)
                break;
            case 'league':
                //console.log('league')
                req.then(res => {
                    //console.log(res)
                    res.data.list.sort((a, b) => a.name.localeCompare(b.name))
                    setWeek(res.data.list)

                })
                DataRelay(props)
                setMatch()
                setSeriesData()
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
                DataRelay(props)
                setGames()
                setSeriesData()
                setActive({ season: active.season, league: active.league, week: props, match: undefined, games: undefined })
                //console.log(active)
                break;
            case 'match':
                //console.log('match')
                AltReq(UrlParse(props.id, 'match-list')).then(res => { 
                    let base = res.data.list
                    let ordered = _.orderBy(base, ['date'], ['asc', 'dsc'])
                    setGames(ordered)

                    let stats = []
                    const StatsParse = props =>{
                        
                        AltReq(props.url).then(res => {
                            stats.push(res.data)
                            setSeriesData(stats)
                        })
                    }
                    //console.log(ordered)

                    ordered.forEach((replay, i, arr) =>{
                        setTimeout(() => {
                            StatsParse({url: UrlParse(replay.id, 'game-stats')})
                        }, i * 500)
                    })
                })
                DataRelay(props)
                setActive({ ...active, match: props, game: undefined })
                //console.log(active)
                break;
            case 'game':
                //console.log(props)
                AltReq(UrlParse(props.id, 'game-stats')).then(res => {
                    //console.log(res.data)
                })
                setSeriesData()
                setActive({...active, game: props})
                break;
            default:
                console.log('default')
        }
    }

    const handleClick = props => {
        //console.log(props)
        setOpen(props);
    };


    const [custom, setCustom] = React.useState()
    const customHandler = props => {

        console.log(custom)
        let url = UrlParse(custom, 'group-stats')
        AltReq(url).then(res => {
            let base = res.data

            console.log(base)


            Updater({ id: base.id, name: base.name, type: 'match' })


        })
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, '& .MuiTextField-root': { m: 1, width: '25ch' }}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Explore - {active && active.season !== undefined ? active.season.name : 'Pick a season'} {active && active.league !== undefined ? ' - ' + active.league.name : null} {active && active.week !== undefined ? ' - ' + active.week.name : null} {active && active.match !== undefined ? ' - ' + active.match.name : null} {active && active.game !== undefined ? ' - ' + active.game.name : null}
                    </Typography>
                    <TextField id="custom-group-id" onChange={e => setCustom(e.target.value)} label="custom group id" variant="outlined" />
                    <Button variant="outlined" onClick={() => customHandler() }>Submit</Button>
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
                        <ListItemText primary="Seasons" secondary={active && active.season !== undefined ? active.season.name : 'Pick a season'} />
                        {open.season ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open.season} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => Updater({ name: 'Season 10', id: 'season-10-j1nooa6jlw', type: 'season' })}
                            >
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Season 10" id='season-10-j1nooa6jlw' />
                            </ListItemButton>

                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => Updater({ name: 'Season 11', id: 'season-11-phqfzmk1fq', type: 'season' })}
                            >
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Season 11" id='season-11-phqfzmk1fq' />
                            </ListItemButton>

                            <ListItemButton
                                sx={{ pl: 4 }}
                                onClick={() => Updater({ name: 'Season 12', id: 'season-12-23wdl6anha', type: 'season' })}
                            >
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary="Season 12" id='season-12-23wdl6anha' />
                            </ListItemButton>
                        </List>

                    </Collapse>
                    <Divider />

                    {leagues !== undefined ? <div>
                        <ListItemButton value="leagues" onClick={event => handleClick({ ...open, leagues: !open.leagues })}>
                            <ListItemText primary="Leagues" secondary={active && active.league !== undefined ? active.league.name : 'Pick a league'} />
                            {open.leagues ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.leagues} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                {leagues.map((item, i) => <ListItem key={i}>
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => Updater({ name: item.name, id: item.id, type: 'league' })}
                                    >
                                        <ListItemIcon>
                                            <GroupsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }

                    {week !== undefined ? <div>
                        <ListItemButton value="weeks" onClick={event => handleClick({ ...open, weeks: !open.weeks })}>
                            <ListItemText primary="Weeks" secondary={active && active.week !== undefined ? active.week.name : 'Pick a week'} />
                            {open.weeks ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.weeks} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {week.map((item, i) => <ListItem key={i} >
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => Updater({ name: item.name, id: item.id, type: 'week' })}

                                    >
                                        <ListItemIcon>
                                            <DateRangeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }

                    {match !== undefined ? <div>
                        <ListItemButton value="matches" onClick={event => handleClick({ ...open, matches: !open.matches })}>
                            <ListItemText primary="Matches" secondary={active && active.match !== undefined ? active.match.name : 'Pick a match'} />
                            {open.matches ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.matches} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {match.map((item, i) => <ListItem key={i} >
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => Updater({ name: item.name, id: item.id, type: 'match' })}
                                    >
                                        <ListItemIcon>
                                            <GamesIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null
                    }

                    {/*games !== undefined ? <div>
                        <ListItemButton value="games" onClick={event => handleClick({ ...open, games: !open.games })}>
                            <ListItemText primary="Games" secondary={active && active.game !== undefined ? active.game.name : 'Groups Stats'} />
                            {open.games ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open.games} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem key={0} >
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => Updater({ name: active.match.name, id: active.match.id, type: 'match' })}
                                    >
                                        <ListItemIcon>
                                            <SportsEsportsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Group'} />
                                    </ListItemButton>
                                </ListItem>
                                {games.map((item, i ) => <ListItem key={i} >
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => Updater({ name: 'Game ' + i++, id: item.id, type: 'game' })}
                                    >
                                        <ListItemIcon>
                                            <SportsEsportsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Game ' + (1 + i++)} />
                                    </ListItemButton>
                                </ListItem>
                                )}

                            </List>
                        </Collapse>
                        <Divider />
                    </div> : null*/}

                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, }}>
                <Toolbar />

                {selected !== undefined ? <DataContext active={active} selected={selected} series={seriesData} /> /*<ExploreTabs active={active} selected={selected} />*/ : <NoneSelected/>}

            </Box>
        </Box>
    );
}
