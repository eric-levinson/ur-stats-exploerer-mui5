import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import pages
import HomePage from './pages/HomePage';
import {ClippedDrawer} from './common/containers/ClippedDrawer'

class Routes extends React.Component {



    render() {
      return (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/explore' component={ClippedDrawer} origin='season-10-j1nooa6jlw' />
          <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
