import React, { Component } from 'react';
import axios from 'axios';
import config from './_environment.js';
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
      <div>
        <CourseData className="courseData" props={this.state.data}/>
        <CommentList className="commentList" props={this.state.data}/>
      </div>
    );
  }
}

function getCourseData(path, state) {
  axios.get(config().dev + 'api/course/' + path)
  .then(response => handleResponse(response, state));
};

function handleResponse(response, state) {
  state.setState({data: response.data});
}


function CourseData(props) {
  var data = props.props;
  if(Object.keys(data).length === 0) {
    return <div/>
  } else {
    return (
      <div key={data.id} className="pure-g">
        <div className="pure-u-md-2-24 pure-u-lg-3-24"/>
        <div className="pure-u-1 pure-u-md-20-24 pure-u-lg-18-24">
          <div className="courseData">
          <h3>{data.id} - {data.name}</h3>
          <IntentObject data={["Description:", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies maximus ullamcorper. Aliquam ac lobortis ligula, a posuere neque. Nulla vel risus porta, laoreet libero ac, tincidunt ipsum. Mauris sodales fermentum dui eget ultricies. Aliquam eu velit lectus. Aliquam suscipit, odio in vulputate pulvinar, orci felis volutpat libero, et semper nisl tortor a risus. Suspendisse in mi in orci fermentum euismod sed consectetur sapien. Integer sagittis eu sem ut porta. Sed laoreet lacus non aliquam dapibus. Etiam in nulla magna. Duis viverra tortor quis aliquam pharetra. Vivamus lobortis nulla vitae dolor sodales, id egestas tellus semper. Aliquam purus justo, pulvinar eu vehicula nec, pulvinar id nisl."]}/>
          <IntentObject data={["Period:", data.period.split("").join("-")]}/>
          </div>
        </div>
        <div className="pure-u-md-2-24 pure-u-lg-3-24"/>
      </div>
    );
  }
}

function CommentList(props) {
  const data = props.props.comments;
  const items = (data !== undefined ? data.map((comment) => CommentItem(comment)) : <div/>);
  return (
    <div>
      {items}
    </div>
  );
}

function CommentItem(props) {
  return (
    <div key={props.body}>
      <IntentObject data={["Comment:", props.body]}/>
      <IntentObject data={["Iteration:", props.iteration]}/>
      <IntentObject data={["Rating:", props.rating]}/>
    </div>
  );
}

function IntentObject(props) {
  const header = props.data[0];
  const text = props.data[1];
  return (
    <div className="course-description">
      <div className="pure-g">
        <div className="pure-u-8-24 pure-u-sm-7-24">
          <b>{header}</b>
        </div>
        <div className="pure-u-16-24 pure-u-sm-17-24">
          {text}
        </div>
      </div>
    </div>
  );
}



export default Course;
