import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './styles/App.css';

class Header extends Component {

  onHeaderClick() {
    sessionStorage.removeItem('state');
    browserHistory.push('/');
  }

  render() {
    return (
        <div className="App-header">
          <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
            <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
            <p className="headerText" onClick={this.onHeaderClick.bind(this)}>Varjo-opinto-opas</p>
          </div>
        </div>
    );
  }
}
//<img src={logo} className="App-logo" alt="logo" />
export default Header;
