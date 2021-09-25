import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export const SimpleTable = props => {


    console.log(props)

    return (
        <div style={{ display: 'flex', height: '80vh', width: '100%' }}>

            <div style={{ flexGrow: 1 }}>
                {/*<DataGrid
                    rows={props.data.rows}
                    columns={props.data.columns}

                    components={{
                        Toolbar: GridToolbar,
                    }}
                />*/}
            </div>
        </div>
    );
}