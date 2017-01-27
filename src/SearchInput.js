import React, { Component } from 'react';
import {debounce} from 'throttle-debounce';
import './styles/App.css';

class SearchInput extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = debounce(1000, this.props.handleSubmit);
  }

  render() {
    return(
      <div className="pure-u-1">
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
        <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
          <input id="searchinput" onKeyUp={this.handleSubmit.bind(this)}
           className="pure-input-1" type="text" autoComplete="off"
            name="search" placeholder="Search..."/>
        </div>
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      </div>
    );
  }
};

export default SearchInput;
