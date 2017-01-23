import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Search extends Component {

  constructor(props) {
      super(props);
      this.state = {courses: []};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      //this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      axios.get('http://thisismydomain.name/scivoo/search')
      .then(response => this.setState(
        {courses: response.data.courses}
      ));

    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
          <div className="pure-g">
          <SearchInput/>
          <SelectPeriod/>
          <div className="pure-u-1">
            <input type="submit" value="Submit" className="pure-button pure-button-primary"/>
          </div>
          </div>
        </form>
        <Courses courses={this.state.courses}/>
      </div>
  );}
}

function Courses(props) {
  console.log(props);
  const courses = props.courses;
  const courseItems = courses.map((course) =>
    <div key={course.id} className="pure-g">
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="course">
        <p>
        <a href="/courses/{course.id}">{course.id} - {course.name}</a>
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

function SearchInput() {
  return(
    <div className="pure-u-1">
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <input id="searchinput" className="pure-input-1" type="text" name="search" placeholder="Search..."/>
      </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    </div>
  );
};

function SelectPeriod() {
  return(
    <div className="pure-u-1">
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="periodchoose" className="pure-input">
          <option>Period - All</option>
          <option>I</option>
          <option>II</option>
          <option>III</option>
          <option>IV</option>
          <option>V</option>
        </select>
      </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    </div>
  );
};

export default Search;
