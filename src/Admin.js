import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './styles/App.css';

let storage = window.sessionStorage;
class Admin extends Component {


  componentWillMount() {
    let token = storage.getItem("token");
    this.redirectToLogin =this.redirectToLogin.bind(this);

    if(!token) {
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    browserHistory.push('/login');
  }

  render() {
    return (
      <div>Hello</div>
    )
  }
}

export default Admin
