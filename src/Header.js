import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import './styles/App.css';

class Header extends Component {

  onHeaderClick() {
    sessionStorage.clear();
    browserHistory.push('/');
  }

  render() {
    return (
        <div className="App-header">
          <h2 className="headerText" onClick={this.onHeaderClick.bind(this)}>SCIVOO</h2>
        </div>
    );
  }
}
//<img src={logo} className="App-logo" alt="logo" />
export default Header;
