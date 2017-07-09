import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/App.css';

class CourseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: props.courses
    }
    this.sortData = this.sortData.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({courses: nextProps.courses}, () => {
    const el = document.getElementById("sortchoose");
    !!el ?
      this.sortData(el.options[el.selectedIndex].value) :
      this.sortData('Sort - Highest rating')
    })
  }

  sortData(e) {
    const sortData = (field, reverse, primer) => {

       var key = primer ?
           function(x) {return primer(x[field])} :
           function(x) {return x[field]};

       reverse = !reverse ? 1 : -1;

       return function (a, b) {
          // eslint-disable-next-line
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         }
    }

    switch (e) {
      case 'Lowest rating':
        this.setState({courses: this.state.courses.sort(sortData('rating', false, parseFloat))})
        break;
      case 'Sort - Highest rating':
        this.setState({courses: this.state.courses.sort(sortData('rating', true, parseFloat))})
        break;
      case 'Heaviest workload':
        this.setState({courses: this.state.courses.sort(sortData('workload', false, parseFloat))})
        break;
      case 'Lightest workload':
        this.setState({courses: this.state.courses.sort(sortData('workload', false, parseFloat))})
        break;
      default:

    }
  }

  render() {
    const items = this.state.courses.map((course) => CourseItem(course))
    if(this.state.courses.length > 0) {
      return (
        <div>
          <SortResults sort={this.sortData}/>
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
};

function SortResults(props) {
  return(
    <div>
    <div className="pure-u-1-2"/>
      <div className="pure-u-1-2">
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="pure-u-1-2"/>
        <div className="pure-u-1-2">
          <select id="sortchoose" className="pure-input" onChange={(e) => props.sort(e.target.value)}>
            <option>Sort - Highest rating</option>
            <option>Lowest rating</option>
            <option>Heaviest workload</option>
            <option>Lightest workload</option>
          </select>
        </div>
      </div>
    </div>
    </div>
  );
};

function CourseItem(props) {
  const course = props;
  const courseName = course.name.length > 22 ? course.name.substring(0, 22) + '...':course.name;
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
  const ratedStars = arr.slice(5-props.rating).map((num) => <i key={num} className="fa fa-star" aria-hidden="true"></i>);
  return (
    <span className="stars">{ratedStars}</span>
  )
}

export default CourseList;
