import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//import pages

import {ClippedDrawer} from './common/containers/ClippedDrawer'
import {GroupDrawer } from './common/containers/GroupDrawer'

class Routes extends React.Component {



    render() {
      return (
        <Switch>
          <Redirect exact from="/" to="/explore" />
          <Route path='/explore' component={ClippedDrawer} />
          {/* <Route path='/group/:id' component={GroupDrawer} /> */}
          
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
