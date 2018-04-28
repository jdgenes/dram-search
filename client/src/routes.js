import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ReviewContainer } from './containers';
import { Home, Welcome, About, Contact, DramsParent } from './components';

const routes = (
  <Router history={hashHistory}>
    
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/drams" component={DramsParent}>
      <IndexRoute component={ReviewContainer} />
      </Route>
    </Route>

  </Router>
);

export default routes;
