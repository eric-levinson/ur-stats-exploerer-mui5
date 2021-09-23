import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// eslint-disable-next-line
import Link from '@mui/material/Link';
import { DataTableFilter } from '../data/DataTableFilter';
import { SelectedListItem } from '../nav/SelectList'
import { UrlParse, AltReq } from "../../../utils/AltReq";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabcontent: {
        height: '100%'
    }
}));

let GenerateTabs = props => {
    const [list, setList] = React.useState("");

    const { id, type } = props;
    console.log(id, type)

    
    React.useEffect(() => {
        const fetchListData = async () => {
            const res = await AltReq(id)
            const { list } = await res.data
            setList(list)
            console.log('fire')
            console.log(res)
        }
        fetchListData()
        // eslint-disable-next-line
    }, [id])

    
    let table = list && typeof list !== undefined ? 'test' : id

    return (
        <>
            {table}
        </>
    )
}



export const SimpleTabs = props => {
    let { id } = useParams();
    console.log(id)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let parse = UrlParse(id, 'group-stats')
    console.log(parse)
    return (
        <div className={classes.root}>
            <h1>{id}</h1>
            <GenerateTabs id={parse} />
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Group" {...a11yProps(0)} />
                    <Tab label="Core" {...a11yProps(1)} />
                    <Tab label="Boost" {...a11yProps(2)} />
                    <Tab label="Positioning" {...a11yProps(3)} />
                    <Tab label="Movement" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.tabcontent}>
                <SelectedListItem/>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabcontent}>
                <DataTableFilter id={id} />
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.tabcontent}>
                <DataTableFilter id={id} />
            </TabPanel>
            <TabPanel value={value} index={3} className={classes.tabcontent}>
                <DataTableFilter id={id} />
            </TabPanel>
            <TabPanel value={value} index={4} className={classes.tabcontent}>
                <DataTableFilter id={id} />
            </TabPanel> 
        </div>
    );
}
