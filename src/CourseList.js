import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/App.css';
import Info from './Info'

const storage = window.sessionStorage;
class CourseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: props.courses
    }
    this.sortData = this.sortData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({courses: nextProps.courses})
  }

  sortData(e) {
    switch (e) {
      case 'Lowest rating':
        storage.setItem("sort", "rating")
        this.props.handleSubmit()
        break;
      case 'Sort - Highest rating':
        storage.setItem("sort", "rating desc")
        this.props.handleSubmit()
        break;
      case 'Heaviest workload':
        storage.setItem("sort", "workload desc")
        this.props.handleSubmit()
        break;
      case 'Lightest workload':
        storage.setItem("sort", "workload")
        this.props.handleSubmit()
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
          <Info/>
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
  const courseName = course.name;
  const rating = Math.round(course.rating);
  const item =
  <div key={course.id} className="pure-g">
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="course">
          <p className="courseLineTop">
            <span>
              {course.id} &ensp; {course.credit} ECTS &ensp; Period: {course.period}
              <StarSystem rating={rating}/>
            </span>
          </p>
          <p className="courseLineBottom">
          <Link to={`/course/${course.id}`} className="courseListLink">{courseName}</Link>
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
