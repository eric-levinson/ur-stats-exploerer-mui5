import * as React from 'react';
import { useContext } from 'react'
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper';
import ThingsContext from '../data/ThingContext'
import { LineChart } from '../data/LineChart'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import _ from 'lodash'
import { orange } from '@mui/material/colors';
import { CountertopsOutlined } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));


const initialState = {
    alignment: 'game_average',
    dataview: 'players',
    format: 'core',
    chartData: [],
}

export const ChartsControl = props => {


    const things = useContext(ThingsContext)
    const [series, setSeries] = React.useState(things[0].series);
    const [state, setState] = React.useState(initialState);

    const seriesReformat = (data, filter) => {
        console.log(filter)
        let activeData = []
        /*
            {
            label: 'player name here',
            data: [12, 19, 3, 5, 2, 3], //stats here, for particular data point across series, max 5-7
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'blue',
            }
        */

        if (filter === 'players' && typeof data !== 'undefined') {

            //console.log(data)

            data.map((item, index) => {
                //console.log(item)
                let newItem = {
                    gamenumber: index++,
                    title: item.title,
                    teams: _.concat(item.blue.players.map((e) => {
                        return {
                            name: e.name,
                            team: 'blue',
                            stats: e.stats[state.format],
                        }
                    }), item.orange.players.map((e) => {
                        return {
                            name: e.name,
                            team: 'orange',
                            stats: e.stats[state.format],
                        }
                    })),
                    players: _.concat(item.blue.players.map(e => { return e.name }), item.orange.players.map(e => { return e.name }))
                }
                activeData.push(newItem)
            })

            let datapoints = _.keys(data[0].blue.players[0].stats.[state.format])

            let mappedData = []
            const formatData = (data) => {
                datapoints.map((item) => {
                    //console.log(data)

                    let players = []
                    data[0].players.map(player => {

                        const mapper = () => {

                            let chillin = []
                            data.map(game => {
                                //creating the object for each player
                                //console.log(game.teams.find(e => e.name === e.name))
                                let playerStats = game.teams.find(e => e.name === player).stats[item]
                                //console.log(playerStats)
                                chillin.push(playerStats)

                            })

                            return chillin
                        }

                        let listStats = {
                            name: player,
                            team: data[0].teams.find(e => e.name === player).team,
                            stats: mapper()
                        }


                        players.push(listStats)
                    })

                    //console.log(players)


                    let dSet = {
                        label: item,
                        series_length: data.length,
                        dataset: players,
                    }

                    mappedData.push(dSet)
                    //console.log(players)
                    //console.log(games)

                })
            }
            formatData(activeData)
            //console.log(_.join([activeData[0].players[0].stats.core.score, activeData[1].players[0].stats.core.score, activeData[2].players[0].stats.core.score], ', '))
            setState({ ...state, chartData: mappedData })
            //console.log(mappedData)

        }
        else if (filter === 'teams' && typeof data !== 'undefined') {
            //console.log(data)
            data.map((item, index) => {
                console.log(item)

                let blueName = item.blue.name !== undefined ? item.blue.name : _.join(_.map(item.blue.players, 'name'), ', ')
                let orangeName = item.orange.name !== undefined ? item.orange.name : _.join(_.map(item.orange.players, 'name'), ', ')

                let newItem = {
                    gamenumber: index++,
                    title: item.title,
                    teams: [{
                            name: blueName,
                            team: 'blue',
                            stats: item.blue.stats[state.format],
                        },{
                            name: orangeName,
                            team: 'orange',
                            stats: item.orange.stats[state.format],
                        },]
                    //players: _.concat(item.blue.players.map(e => { return e.name }), item.orange.players.map(e => { return e.name }))
                }
                activeData.push(newItem)
            })

            let datapoints = _.keys(data[0].blue.stats.[state.format])

            let mappedData = []
            const formatData = (data) => {
                datapoints.map((item) => {
                console.log(data)

                    let teams = []
                    data[0].teams.map(team => {
                        console.log(team)
                        const mapper = () => {

                            let chillin = []
                            data.map(game => {
                                //console.log(game)
                                //creating the object for each player
                                //console.log(game.teams.find(e => e.name === e.name))
                                let teamStats = game.teams.find(e => e.team === team.team).stats[item]
                                //console.log(playerStats)
                                chillin.push(teamStats)
                            })
                            //console.log(chillin)
                            return chillin
                        }

                        let listStats = {
                            name: team.name,
                            team: team.team,
                            stats: mapper()
                        }


                        teams.push(listStats)
                    })

                    //console.log(players)


                    let dSet = {
                        label: item,
                        series_length: data.length,
                        dataset: teams,
                    }

                    mappedData.push(dSet)
                    //console.log(players)
                    //console.log(mappedData)

                })
            }
            formatData(activeData)
            //console.log(_.join([activeData[0].players[0].stats.core.score, activeData[1].players[0].stats.core.score, activeData[2].players[0].stats.core.score], ', '))
            setState({ ...state, chartData: mappedData })
            

        }


    }

    React.useEffect(() => {
        setSeries(things[0].series);
        seriesReformat(series, state.dataview)
    }, [things[0].series, state.format]);

    //console.log(series)
    //console.log(state)

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    //border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                }}
            >
                <StyledToggleButtonGroup
                    size="small"
                    value={state.dataview}
                    exclusive
                    onChange={(e) => setState({ ...state, [e.target.id]: e.target.value })}
                    aria-label="text formatting"
                >
                    <ToggleButton id="dataview" value="players">Players</ToggleButton>
                    <ToggleButton id="dataview" value="teams">Teams</ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                {/* <StyledToggleButtonGroup
                    size="small"
                    value={state.alignment}
                    exclusive
                    onChange={(e) => setState({ ...state, [e.target.id]: e.target.value })}
                    aria-label="text alignment"
                >
                    <ToggleButton id="alignment" value="game_average">Averge</ToggleButton>
                    <ToggleButton id="alignment" value="cumulative">Cumulative</ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
                <StyledToggleButtonGroup
                    size="small"
                    value={state.format}
                    exclusive
                    onChange={(e) => setState({ ...state, [e.target.id]: e.target.value })}
                    aria-label="text formatting"
                >
                    <ToggleButton id="format" value="core">Core</ToggleButton>
                    {/* <ToggleButton id="format" value="ball">Ball</ToggleButton> */}
                    <ToggleButton id="format" value="boost">Boost</ToggleButton>
                    <ToggleButton id="format" value="positioning">Positioning</ToggleButton>
                    <ToggleButton id="format" value="movement">Movement</ToggleButton>
                    <ToggleButton id="format" value="demo">Demos</ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
            <Divider />
            <Box sx={{ flexGrow: 1, margin: 2 }}>
                <Grid container spacing={2}>

                    {state.chartData !== [] ? null : null}

                    {state.chartData.map((item, index) => 
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <LineChart data={item} />
                        </Grid>
                    )}
                
                    {/*
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LineChart />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <LineChart />
                    </Grid>*/}

                </Grid>
            </Box>

        </>)
}