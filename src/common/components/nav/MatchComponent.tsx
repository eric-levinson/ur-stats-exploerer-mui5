import * as React from 'react';
import { useContext } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ThingsContext from '../data/ThingContext'
import { LineChart } from '../data/LineChart'
import { FormatClearSharp } from '@material-ui/icons';


export const ColorTabs = (props: any) => {

  const things = useContext(ThingsContext)
  let formats = things[0].control.format
  //console.log(things)
  const [value, setValue] = React.useState();
  const [series, setSeries] = React.useState<any[]>(things[0].series);

  React.useEffect(() => {
      setSeries(things[0].series);
  }, [things[0].series]);

  console.log(series)
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <> 
    
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        {formats.map((format: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, i: number) => { return <Tab value={i++} label={format} /> })}
      </Tabs>
      <Box sx={{ width: '30%', height: '300px'}}>
        <LineChart />
      </Box>
    </Box>
    </>
  );
}
