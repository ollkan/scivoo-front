import React, { Component } from 'react';
import Search from './Search'
import Header from './Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Search/>
      </div>
    );
  }
}

export default App;
