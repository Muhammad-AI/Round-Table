import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  /* Link, */
} from 'react-router-dom';

import Main from './pages/Main';
import Join from './pages/Join';
import Hub from './pages/Hub';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          {/*<Route path="/results/:sessionId">
            <Results />
        </Route>*/}
          <Route path="/hub">
            <Hub />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
