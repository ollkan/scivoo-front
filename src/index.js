import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './Search'
import Course from './Course'
import Login from './Login'
import Admin from './Admin'
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router'
import './styles/index.css';
import config from './_environment.js';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={config().initialRoute} component={App}>
      <IndexRoute component={Search}/>
      <Route path={config().courseRoute} component={Course}/>
      <Route path={config().loginRoute} component={Login}/>
      <Route path={config().adminRoute} component={Admin}/>
    </Route>
  </Router>
  ,document.getElementById('root')
);
