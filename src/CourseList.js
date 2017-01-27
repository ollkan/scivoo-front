import React, { Component } from 'react';
import { Link } from 'react-router';
import './StarSystem.css'
import './App.css';

class CourseList extends Component {

  render() {
    return (
      <div>
        <CourseItems courses={this.props}/>
      </div>
    );
  }
};

function CourseItems(props) {
  const data = props.courses.courses;
  const rate = 2;
  const items = data.map((course) =>
    <div key={course.id} className="pure-g">
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
        <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
          <div className="course">
            <p className="courseLine">
              <span>
                <Link to={`/course/${course.id}`}>{course.id} - {course.name}, 5 ECTS, II Period</Link>
                <StarSystem rating={rate}/>
              </span>
            </p>
          </div>
        </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    </div>
  );
  return (
    <div>
      <ul>{items}</ul>
    </div>
  );
}


function StarSystem(props) {
  var arr = [1,2,3,4,5];
  const ratedStars = arr.slice(5-props.rating).map((num) => <label key={num} className="rated-star"/>);
  const unratedStars = arr.slice(props.rating).map((num) => <label key={num} className="unrated-star"/>);
  return (
    <span className="stars">{unratedStars}{ratedStars}</span>
  )
}

export default CourseList;
