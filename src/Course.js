import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.css';

class Course extends Component {

  constructor(props) {
      super(props);
      this.state = {data: {}};

    }

    componentDidMount() {
      getCourseData(this.props.params.id, this);
    }

  render() {
    return (
      <div className="Course">
        <CourseData className="courseData" props={this.state.data}/>
      </div>
    );
  }
}

function getCourseData(path, state) {
  axios.get('http://thisismydomain.name/scivoo/api/course/' + path)
  .then(response => state.setState(
    {data: response.data}
  ));
}

function CourseData(props) {
  var data = props.props;
  if(Object.keys(data).length === 0) {
    return <div/>
  } else {
    return (
      <div key={data.id} className="pure-g">
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
        <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
          <div className="courseData">
          <h2>{data.id} - {data.name}</h2>
          <div className="course-description"><b>Description:</b> {data.description}</div>
          <div className="course-period"><b>Period:</b> {data.period}</div>
          </div>
        </div>
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      </div>
    );
  }
}

export default Course;
