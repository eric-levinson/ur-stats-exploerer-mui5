import React, { useContext } from 'react';
import DataGrid from 'react-data-grid';

import ThingsContext from './ThingContext'

export const SimpleTable = props => {

    const things = useContext(ThingsContext)

    let columns = things.[0].columns
    let rows = things.[0].rows

    return (
        <>
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ flexGrow: 1, }}>
                    <DataGrid
                        style={{ height: '85vh' }}
                        columns={columns}
                        rows={rows}
                    />
                </div>
            </div></>
    );
}