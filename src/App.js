import React, { Component } from 'react';
import Header from './Header'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="bg">
        </div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
