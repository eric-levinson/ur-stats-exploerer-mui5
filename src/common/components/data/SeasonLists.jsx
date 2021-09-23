import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
                <ListItemText primary={primary} />
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
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
        width: 360,
    },
});

const ResolveItems = props => {
    const [list, setList] = React.useState("");

    const { url } = props;
    

    React.useEffect(() => {
        const fetchListData = async () => {
            const res = await AltReq(url)
            const {list} = await res.data
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



export const SeasonLists = (e) => {


    const classes = useStyles();
    //console.log(e)
    //let links = typeof lists.list ? 'test' : lists.list.map((list, i) => <p>{list.name}</p>)
    /*<ListItemLink color="inherit" href={list.link}  to={list.name}/>*/

    let url = UrlParse(e.id, 'group-list')

    


    
    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <div className={classes.root}>
                <Route>
                    {({ location }) => (
                        <Typography gutterBottom>Current route: {location.pathname}</Typography>
                    )}
                </Route>
                <Paper elevation={0}>
                    <List aria-label="secondary mailbox folders">
                        <ResolveItems url={url} />
                    </List>
                </Paper>
            </div>
        </MemoryRouter>
        
    );
}
