import React, {useContext} from 'react';
import DataGrid from 'react-data-grid';

import ThingsContext from './ThingContext'

export const SimpleTable = props => {

    const things = useContext(ThingsContext)
    
    

    return (
       <> {console.log(things.[0].columns)}
          {console.log(things.[0].rows)}
                   <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ flexGrow: 1, }}>
                    <DataGrid
                        columns={things.[0].columns}
                        rows={things.[0].rows} 

                    />
                </div>
            </div></>
    );
}