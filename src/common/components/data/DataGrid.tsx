import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { AltReq, UrlParse } from '../../../utils/AltReq';
import LanguageIcon from '@mui/icons-material/Language';
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton'
import DateRangeIcon from '@mui/icons-material/DateRange';
import GamesIcon from '@mui/icons-material/Games';
import Typography from '@mui/material/Typography';


const drawerWidth = 240;



export const QuickFilteringGrid = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  const [active, setActive] = React.useState() // eslint-disable-next-line
  const [season, setSeason] = React.useState() // eslint-disable-next-line
  const [leagues, setLeagues] = React.useState() // eslint-disable-next-line
  const [week, setWeek] = React.useState() // eslint-disable-next-line
  const [match, setMatch] = React.useState() // eslint-disable-next-line
  const [games, setGames] = React.useState() // eslint-disable-next-line
  const [selected, setSelected] = React.useState() // eslint-disable-next-line
  const [open, setOpen] = React.useState({ season: true, leagues: true, weeks: true, matches: true });

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
        //setSelected(props)
        setWeek()
        setMatch()
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
        setActive({ season: active.season, league: active.league, week: props, match: undefined, games: undefined })
        //console.log(active)
        break;
      case 'match':
        //console.log('match')
        req.then(res => {
          res.data.list.sort((a, b) => a.name.localeCompare(b.name))
          setGames(res.data.list)
          //console.log(res.data.list)
        })
        DataRelay(props)
        setActive({ ...active, match: props, })
        //console.log(active)
        break;
      default:
        console.log('default')
    }
  }

  const handleClick = props => {
    //console.log(props)
    setOpen(props);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Explore - {active && active.season !== undefined ? active.season.name : 'Pick a season'} {active && active.league !== undefined ? ' - ' + active.league.name : null} {active && active.week !== undefined ? ' - ' + active.week.name : null} {active && active.match !== undefined ? ' - ' + active.match.name : null}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

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

      </Box>


     
    </Box>
  );
}


