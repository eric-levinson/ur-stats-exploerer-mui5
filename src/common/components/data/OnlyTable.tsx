import React, { useContext } from 'react';
import {
    DataGrid,
    GridToolbar,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarExport, 
    GridToolbarColumnsButton ,
} from '@mui/x-data-grid';
import ThingsContext from './ThingContext'
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import IconButton from '@mui/material/IconButton';
import _ from 'lodash'


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme: Theme) =>
        createStyles({
            root: {
                padding: theme.spacing(0.5, 0.5, 0),
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',

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

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </div>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}



export const SimpleTable = () => {

    const things = useContext(ThingsContext)

    let data = {
        rows: things[0].rows,
        columns: things[0].columns
    }

    //console.log(data)

    //const { data } = useDemoData({
    //    dataSet: 'Commodity',
    //    rowLength: 250,
    //    maxColumns: 45,
    //});


    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState < any[] > (data.rows);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.rows.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
        setRows(data.rows);
    }, [data.rows]);

    return (
        <>
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ flexGrow: 1, }}>
                <DataGrid
                        style={{}}
                        components={{ Toolbar: QuickSearchToolbar }}
                        rows={rows}
                        columns={data.columns}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (event) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(''),
                            },
                        }}
                    />
                </div>
            </div></>
    );
}