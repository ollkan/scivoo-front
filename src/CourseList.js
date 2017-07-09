import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/StarSystem.css'
import './styles/App.css';

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
  const items = data.map((course) => CourseItem(course));

  if(data.length > 0) {
    return (
      <div>
        <SortResults data={data}/>
        <ul>{items}</ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul>{items}</ul>
      </div>
    );
  }


}

function SortResults(data) {
  return(
    <div>
    <div className="pure-u-1-2"/>
    <div className="pure-u-1-8"/>
    <div className="pure-u-1-3">
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <select id="sortchoose" className="pure-input" onChange={(e) =>sortData(e, data)}>
          <option>Sort - Best first</option>
          <option>Worst first</option>
          <option>Workload first</option>
        </select>
      </div>
    </div>
    </div>
  );
};

function sortData(e, data) {
  switch (e.target.value) {
    case 'Worst first':
      console.log('worst')
      console.log(data)

      break;
    case 'Sort - Best first':
      console.log('best')
      break;
    case 'Workload first':
      console.log('workload')
      break;
    default:

  }
}

function CourseItem(props) {
  const course = props;
  const courseName = course.name.length > 30 ? course.name.substring(0, 30) + '...':course.name;
  const rating = Math.round(course.rating);
  const item =
  <div key={course.id} className="pure-g">
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="course">
          <p className="courseLine">
            <span>
              <Link to={`/course/${course.id}`}
              className="courseListLink">{course.id} - {courseName}
              , {course.credit} ECTS, {course.period} Period</Link>
              <StarSystem rating={rating}/>
            </span>
          </p>
        </div>
      </div>
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
  </div>

  return(item);
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
