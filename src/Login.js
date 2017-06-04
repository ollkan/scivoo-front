import React, { Component } from 'react';
import axios from 'axios';
import config from './_environment.js'
import querystring from 'query-string';
import { browserHistory } from 'react-router';
import './styles/App.css';

let storage = window.sessionStorage;
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: '', fail: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleFailedAuth = this.handleFailedAuth.bind(this);
  }

  handleResponse(response) {
    let token = response.data.token;
    if(token.length > 0) {
      storage.setItem("token", token);
      browserHistory.push('/admin');
    } else {
      this.handleFailedAuth()
    }
  }

  handleFailedAuth() {
    console.log('fail')
    this.setState({password: '', fail: 'Incorrect username or password'})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    let query = querystring.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.post(config().dev + 'api/login', query,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }})
    .then(response => this.handleResponse(response));
  }

  handleChange(event) {
    let target = event.target;
    let name = target.name;
    this.setState({[name]: event.target.value});
  }


  render() {
    return (
      <div className="pure-form">
        <form onSubmit={this.handleSubmit}>
            <div>
              <input id="loginUsername" className="pure-input" type="text" name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange}/>
            </div>
            <div>
              <input className="pure-input" type="password" name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
            </div>
            <div>
              <button id="loginButton" className="pure-button pure-button-primary" type="submit">Login</button>
              <p style={{color: 'red'}}>{this.state.fail}</p>
            </div>
        </form>
      </div>
    )
  }
}

export default Login
