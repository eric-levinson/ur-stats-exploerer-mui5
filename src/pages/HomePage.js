import '../App.css';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { MainNav } from '../common/components/nav/AppBar'
import { SeasonLists } from '../common/components/data/SeasonLists'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

function HomePage() {
    const classes = useStyles();
    const crumbs = [{ name: 'Home', link: '/' }]
    /*const mainNav = [{name: 'Ramen', link: '/ramen', icon: 'test-icon'},
                    {name: 'Noodle Cup Series', link: '/ncs', icon: 'test-icon'},
                    {name: 'Macaroni', link: '/macaroni', icon: 'test-icon'},
                    {name: 'Fettuccine', link: '/fettuccine', icon: 'test-icon'},
                    {name: 'Linguine', link: '/linguine', icon: 'test-icon'}]
    const subNav = [{name: 'Core', link: '/ramen/core', icon: 'test-icon'},
                    {name: 'Boost', link: '/ramen/boost', icon: 'test-icon'},
                    {name: 'Positioning', link: '/ramen/positioning', icon: 'test-icon'},
                    {name: 'Movement', link: '/ramen/movement', icon: 'test-icon'}]*/


    return (
        <div className="App">

            < MainNav page='Home' crumbs={crumbs} />
            <div className="App-header">
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <h2>Season 10</h2>
                            <SeasonLists id='season-10-j1nooa6jlw'/>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>Season 11</h2>
                            <SeasonLists id='season-11-phqfzmk1fq'/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
