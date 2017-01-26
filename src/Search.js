import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'query-string';
import { Link } from 'react-router';
import SearchInput from './SearchInput';
import './App.css';

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
        period: (period > 0) ? period.toString() : '',
        points: (points > 0) ? points.toString() : ''
      });

      axios.post('http://thisismydomain.name/scivoo/api/search', query,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }})
      .then(response => handleResponse(this, response)
      );

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
        <Courses courses={this.state.courses}/>
      </div>
  );}
}

function handleResponse(state, response) {
  state.setState({courses: response.data.courses});
  console.log(state);
  storage.setItem("state", JSON.stringify(response.data.courses));
  console.log(JSON.parse(storage.getItem("state")));
}

function Courses(props) {
  const courses = props.courses;
  const courseItems = courses.map((course) =>
    <div key={course.id} className="pure-g">
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="course">
        <p>
        <Link to={`/course/${course.id}`}>{course.id} - {course.name}</Link>
        <span className="periods">Periods: II</span>
        </p>
        <p className="course-prof">Teacher: {course.description}</p>
        </div>
      </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    </div>
  );
  return (
    <div>
    <ul>{courseItems}</ul>
    </div>
  );
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
  return(
    <div className="pure-u-1-2">
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="pointchoose" className="pure-input">
          <option>Points - Any</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      <div className="pure-u-md-6-24 pure-u-lg-10-24"/>
    </div>
  );
}

/*function SearchButton() {
  return(
    <div className="pure-u-1">
      <input type="submit" value="Submit" className="pure-button pure-button-primary"/>
    </div>
) ;
}*/

export default Search;
