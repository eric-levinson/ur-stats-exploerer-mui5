import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

//import _ from 'lodash'

import { UrlParse, AltReq } from '../../../utils/AltReq'

//import { LocalDrinkSharp } from '@mui/icons-material';
//import  BallchaseRequest  from '../utils/BallchaseRequest.js'

function ListItemLink(props) {

    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
    },
});

const ResolveItems = props => {
    const [list, setList] = React.useState("");

    const { url } = props;


    React.useEffect(() => {
        const fetchListData = async () => {
            const res = await AltReq(url)
            const { list } = await res.data
            setList(list)
        }
        fetchListData()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {list && typeof list !== undefined ? list.map(item => <ListItemLink to={item.id} primary={item.name} icon={<ArrowForwardIosIcon />} />) : <CircularProgress />}
        </>
    )
}

const ResolveChildren = props => {
    const [list, setList] = React.useState("");

    const { id, type } = props;

    let url = UrlParse(id, type)

    console.log(url)

    React.useEffect(() => {
        const fetchListData = async () => {
            const res = await AltReq(url)
            const { list } = await res.data
            console.log(res)
            setList(list)
        }
        fetchListData()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {list && typeof list !== undefined ? list.map(item => <ListItemLink to={item.id} primary={item.name} icon={<ArrowForwardIosIcon />} />) : <CircularProgress />}
        </>
    )
}


export const GroupList = (e) => {


    const classes = useStyles();
    //console.log(e)
    //let links = typeof lists.list ? 'test' : lists.list.map((list, i) => <p>{list.name}</p>)
    /*<ListItemLink color="inherit" href={list.link}  to={list.name}/>*/

    let url = UrlParse(e.id, 'group-list')



    console.log(e.id)


    return (
        <MemoryRouter initialEntries={['linguine-league-ym3c98mwxs']} initialIndex={0}>
            <div className={classes.root}>
                <Route>
                    {({ location }) => (
                        <Typography gutterBottom>Current route: {location.pathname}</Typography>
                    )}
                </Route>
                <Paper elevation={0}>
                    <List aria-label="secondary">
                        <ResolveItems url={url} />
                    </List>
                    <Divider />
                    <List aria-label="secondary">
                        <Route>
                            {({ location }) => (
                                <ResolveChildren id={location.pathname} type='group-list' />
                            )}
                        </Route>
                    </List>
                </Paper>

            </div>
        </MemoryRouter>

    );
}
