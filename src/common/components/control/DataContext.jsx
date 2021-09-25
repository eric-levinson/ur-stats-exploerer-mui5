import * as React from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper';
import { SimpleTable } from '../data/OnlyTable'
import { DataGrid, 
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbar } from '@mui/x-data-grid';

import _ from 'lodash'

import DataTable from 'react-data-table-component';
//const deez = [
//    {
//        name: 'Title',
//        sortable: true,
//        selector: row => row.title,
//    },
//    {
//        name: 'Year',
//        sortable: true,
//        selector: row => row.year,
//    },
//];
//
//const nuth = [
//    {
//        id: 1,
//        title: 'Beetlejuice',
//        year: '1988',
//    },
//    {
//        id: 2,
//        title: 'Ghostbusters',
//        year: '1984',
//    },
//]

//const ThingsContext = React.createContext({})
//export const ThingsProvider = ThingsContext.Provider
//export default ThingsContext

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

function CustomToolbar() {
    return (
        <div>
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </GridToolbarContainer>
        </div>
    );
}

export const DataContext = props => {

    //const things = React.useContext(ThingsContext)
    console.log(props.selected.data)
    let stats = props.selected.data
    const [alignment, setAlignment] = React.useState('game_average');
    const [dataView, setDataView] = React.useState('players');
    const [formats, setFormats] = React.useState(() => ['core']);// eslint-disable-next-line
    const [rows, setRows] = React.useState([]) // eslint-disable-next-line
    const [columns, setColumns] = React.useState([
        {
            name: 'Title',
            sortable: true,
            selector: row => row.title,
        },
        {
            name: 'Year',
            sortable: true,
            selector: row => row.year,
        },
    ])
    //console.log(alignment)
    //console.log(dataView)
    //console.log(formats)
    const handleChange = (event, props) => {
        //console.log(props.id)
        if (props.id === 'alignment') {
            setAlignment(props.value);
        } else if (props.id === 'dataview') {
            setDataView(props.value)
        }

    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    //console.log(data[dataView])
    let initMap = stats[dataView].map(item => {
        let statArr = []
        formats.forEach(format => _.assign(statArr, item.[alignment].[format]))
        let team = item.team !== undefined ? item.team : null
        return _.assign({ id: item.name, name: item.name, team }, statArr)
    })
    //console.log(initMap)

    React.useEffect(() => {
        let headers = initMap !== [] ? _.keys(initMap[0]) : []
        //let col = headers !== [] ? headers.map(header => { return { field: header, headerName: header, width: 150, editable: false, } }) : columns
        let col = headers !== [] ? headers.map(header => { return { id: header, sortable: true, selector: row => row.[header], } }) : columns
        
        //console.log(col)
        //console.log(initMap)
        setColumns(col)
        setRows(initMap)


    }, [props, alignment, dataView, formats])

    console.log(columns)
    console.log(rows)
    return (
        <div>
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
                    value={dataView}
                    onChange={(e) => handleChange(e, e.target)}
                    aria-label="text formatting"
                >
                    <ToggleButton id="dataview" value="players">Players</ToggleButton>
                    <ToggleButton id="dataview" value="teams">Teams</ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={(e) => handleChange(e, e.target)}
                    aria-label="text alignment"
                >
                    <ToggleButton id="alignment" value="game_average">Averge</ToggleButton>
                    <ToggleButton id="alignment" value="cumulative">Cumulative</ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton id="format" value="core">Core</ToggleButton>
                    <ToggleButton id="format" value="boost">Boost</ToggleButton>
                    <ToggleButton id="format" value="positioning">Positioning</ToggleButton>
                    <ToggleButton id="format" value="movement">Movement</ToggleButton>
                    <ToggleButton id="format" value="demo">Demos</ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
            <Divider />
            <div style={{ display: 'flex', height: '80vh', width: '100%' }}>
                <div style={{ flexGrow: 1,}}>
                    <DataTable
                    columns={columns}
                    data={rows}
                    theme='dark'
                    pagination
                    fixedHeader
                />
                </div>
            </div>
        </div>
    );
}