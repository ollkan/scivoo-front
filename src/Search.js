import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'query-string';
import SearchInput from './SearchInput';
import CourseList from './CourseList'
import config from './_environment.js'
import './styles/App.css';

const storage = window.sessionStorage;
class Search extends Component {

  constructor(props) {
      super(props);

      var storageState = JSON.parse(storage.getItem("state"));

      if(storageState !== null) {
        this.state = {courses: storageState};
      } else {
        this.state = {courses: []};
      }

      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit() {
      var points = document.getElementById("pointchoose").selectedIndex;
      var period = document.getElementById("periodchoose").selectedIndex;
      var search = document.getElementById("searchinput").value;

      var query = querystring.stringify({
        search: search,
        period: (period > 0) ? period.toString() : 'Any',
        points: (points > 0) ? points.toString() : 'Any'
      });

      axios.post(config().dev + 'api/search', query,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(response => handleResponse(this, response));

    }

  render() {
    return (
      <div>
        <div className="pure-form pure-form-stacked">
          <div className="pure-g">
          <SelectPeriod/>
          <SelectPoints/>
          <SearchInput handleSubmit={this.handleSubmit}/>
          </div>
        </div>
        <CourseList courses={this.state.courses}/>
      </div>
  );}
}

function handleResponse(state, response) {
  state.setState({courses: response.data.courses});
  storage.setItem("state", JSON.stringify(response.data.courses));
}

function SelectPeriod() {
  return(
    <div className="pure-u-1-2">
      <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="periodchoose" className="pure-input">
          <option>Period - Any</option>
          <option>I</option>
          <option>II</option>
          <option>III</option>
          <option>IV</option>
          <option>V</option>
        </select>
      </div>
    </div>
  );
};

function SelectPoints() {
  var options = [...Array(10).keys()].map(i => (i + 1)).map(num => <option key={num}>{num}</option>);
  return(
    <div className="pure-u-1-2">
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="pointchoose" className="pure-input">
          <option>Credits - Any</option>
          {options}
        </select>
      </div>
      <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
    </div>
  );
}

export default Search;
