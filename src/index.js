import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Search from './Search'
import Course from './Course'
import { Router, Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Search}/>
      <Route path="course/:id" component={Course}/>
    </Route>
  </Router>
  ,document.getElementById('root')
);
