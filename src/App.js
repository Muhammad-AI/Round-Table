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
import Lobby from './pages/Lobby';
import Play from './pages/Play';
import GameHost from './pages/GameHost';
import './firebase/config'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
          <Route path="/hub/:pin">
            <Hub />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/game-host">
            <GameHost />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
