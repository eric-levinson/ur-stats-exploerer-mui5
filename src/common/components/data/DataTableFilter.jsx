import * as React from 'react';
import {
    DataGrid,
    GridOverlay,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { UrlParse, AltReq } from '../../../utils/AltReq';

import _ from 'lodash'




const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: theme.spacing(0.5, 0.5, 0),
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            fontColor: 'white',
        },
        textField: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            margin: theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(0.5),
            },
            '& .MuiInput-underline:before': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
    }),
    { defaultTheme },
);

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}




export const DataTableFilter = props => {
    let id = UrlParse(props.id, 'group-stats')
    //const res =  AltReq(id)
    //const { data } = res.data.players.map(player => {return {name: player.name}})
    /*
    const fetchListData = async () => {
        const res = await AltReq(id)
        //let data = res.data.players.map(player => {return {name: player.name}})
        //const { rows } = await res.data.players.map(player => {return {name: player.name}})
        //console.log(rows)
        setRows(res)
    }
    fetchListData()*/
    //console.log(data)

    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([])
    //const [list, setList] = React.useState("");



    function QuickSearchToolbar(props) {
        const classes = useStyles();

        return (
            <div className={classes.root}>
                <div>
                    <GridToolbarContainer>
                        <GridToolbarColumnsButton />
                        <GridToolbarFilterButton />
                        <GridToolbarDensitySelector />
                        <GridToolbarExport />
                    </GridToolbarContainer>
                </div>
            </div>
        );
    }


    React.useEffect(() => {
        //const res = await AltReq(id)
        //let data = res.data.players.map(player => {return {name: player.name}})
        //const { rows } = await res.data.players.map(player => {return {name: player.name}})
        //console.log(rows)

        let base = [{
            field: 'name',
            headerName: 'Names',
            width: 150,
            editable: true,
        }, {
            field: 'team',
            headerName: 'Teams',
            width: 150,
            editable: true,
        }]

        let headers = props.data.players !== undefined ? _.keys(props.data.players[0].game_average[props.type]) : []
        let content = props.data.players !== undefined ? props.data.players.map(player => { 
            let stats = player.game_average[props.type]
            return _.extend(stats, { id: player.id, name: player.name, team: player.team, })
        
        }) : []
        setRows(props.data.players !== undefined ? content : [])
        //console.log(rows)
        setColumns(_.concat(base, headers.map(header => { return { field: header, headerName: header, width: 150, editable: false, } })))

        console.log(props.type)
        console.log(content)
        // eslint-disable-next-line
    }, [props])

    return (
        <div style={{ display: 'flex', height: '80vh', width: '100%' }}>

            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    components={{ Toolbar: QuickSearchToolbar }}
                    rows={rows}
                    columns={columns}

                />
            </div>
        </div>
    );
}
