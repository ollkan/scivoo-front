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
        this.state = {courses: storageState, more: true};
      } else {
        this.state = {courses: [], more: true};
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleMore = this.handleMore.bind(this);
    }


    handleSubmit(newQuery) {
      const oldQuery = JSON.parse(storage.getItem("lastQuery"))
      const points = newQuery ? document.getElementById("pointchoose").selectedIndex : oldQuery.points
      const period = newQuery ? document.getElementById("periodchoose").selectedIndex : oldQuery.period
      const search = newQuery ? document.getElementById("searchinput").value : oldQuery.search
      const rating = storage.getItem("sort") || "rating desc"

      const lastQuery = {
        points: points,
        period: period,
        search: search
      }

      storage.setItem("lastQuery", JSON.stringify(lastQuery));

      const query = querystring.stringify({
        search: search,
        period: (period > 0) ? period.toString() : 'Any',
        credit: (points > 0) ? points.toString() : 'Any',
        sort: rating
      });

      axios.post(config().dev + 'api/search', query,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(response => handleResponse(this, response));

    }

    handleMore() {
      const lastQuery = JSON.parse(storage.getItem("lastQuery"));
      const points = lastQuery.points;
      const period = lastQuery.period;
      const search = lastQuery.search;
      const offset = JSON.parse(storage.getItem("state"))
      const rating = storage.getItem("sort") || "rating desc"
      const l = offset.length

      const query = querystring.stringify({
        search: search,
        period: (period > 0) ? period.toString() : 'Any',
        credit: (points > 0) ? points.toString() : 'Any',
        offset: l,
        sort: rating
      });

      axios.post(config().dev + 'api/search', query,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(response => handleMoreResponse(this, response, l));
    }

  render() {
    return (
      <div>
        <div className="pure-u-1-2">
          <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
          <div className="pure-u-1 pure-u-md-12-24 pure-u-lg-4-24 search">

          </div>
          <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
        </div>
        <div className="pure-form pure-form-stacked">
          <div className="pure-g">
          <SelectPeriod handleSubmit={this.handleSubmit}/>
          <SelectPoints handleSubmit={this.handleSubmit}/>
          <SearchInput handleSubmit={this.handleSubmit}/>
          </div>
        </div>
        <CourseList courses={this.state.courses} handleSubmit={this.handleSubmit}/>
        <More handleMore={this.handleMore} state={this.state}/>
      </div>
  );}
}

function handleMoreResponse(state, response, old) {
  const n = JSON.parse(storage.getItem("state")).concat(response.data.courses)
  state.setState({courses: n});
  storage.setItem("state", JSON.stringify(JSON.parse(storage.getItem("state")).concat(response.data.courses)));
  if(n.length === old) state.setState({more: false})
}

function handleResponse(state, response) {
  state.setState({courses: response.data.courses, more: true});
  storage.setItem("state", JSON.stringify(response.data.courses));
}

function SelectPeriod(handleSubmit) {
  return(
    <div className="pure-u-1-2">
      <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="periodchoose" className="pure-input" onChange={handleSubmit.handleSubmit.bind(true)}>
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

function SelectPoints(handleSubmit) {
  var options = [...Array(10).keys()].map(i => (i + 1)).map(num => <option key={num}>{num}</option>);
  return(
    <div className="pure-u-1-2">
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="pointchoose" className="pure-input" onChange={handleSubmit.handleSubmit.bind(true)}>
          <option>Credits - Any</option>
          {options}
        </select>
      </div>
      <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
    </div>
  );
}

function More(handleMore) {
    if(handleMore.state.courses.length > 0 && handleMore.state.more) {
      return (<div>
        <div className="pure-u-1-2"/>
          <div className="pure-u-1-2">
          <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
            <div className="pure-u-1-2"/>
            <div className="pure-u-1-2">
              <input className="pure-button pure-button-secondary  more" value="More" type="button" id="inputButton" onClick={handleMore.handleMore}/>
            </div>
          </div>
        </div>
      </div>
      )} else {
        return <div/>
    } 
}

export default Search;
