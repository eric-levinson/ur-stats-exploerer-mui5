import React, {  } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import { ThemeProvider, createMuiTheme, } from '@mui/material/styles';

const theme = createMuiTheme();



const App = () => {
  return <ThemeProvider theme={theme}><Router>
  <main>
    <Routes/>
  </main>
</Router></ThemeProvider>
}

export default App