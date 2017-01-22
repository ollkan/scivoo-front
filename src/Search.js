import React, { Component } from 'react';
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

    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
            <input id="searchinput" type="text" name="search" placeholder="Search..." onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
        </form>
        <Courses courses={this.state.courses}/>
      </div>
    );
  }
}

function Courses(props) {
  const courses = props.courses;
  const courseItems = courses.map((course) =>
    <li key={course.toString()}>
      {course}
    </li>
  );
  return (
    <div>
    <ul>{courseItems}</ul>
    </div>
  );
}

export default Search;
