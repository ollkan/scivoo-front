import React, { Component } from 'react';
import axios from 'axios';
import config from './_environment.js';
import querystring from 'query-string';
import './styles/App.css';

class Course extends Component {

  constructor(props) {
      super(props);
      this.state = {data: {}, comments: []};
    }

    componentDidMount() {
      getCourseData(this.props.params.id, this);
    }


  render() {
    return (
      <div>
        <CourseData className="courseData" props={this.state.data}/>
        <PostComment>
          <PostCommentSelectors>
            <InputButton commentCourse={commentCourse.bind(null, this)}/>
          </PostCommentSelectors>
        </PostComment>
        <CommentList className="commentList" props={this.state.comments}/>
      </div>
    );
  }
}

function getCourseData(path, state) {
  axios.get(config().dev + 'api/course/' + path)
  .then(response => handleResponse(response, state));
};

function handleResponse(response, state) {
  state.setState({data: response.data, comments: response.data.comments});
}

function commentCourse(props) {
  var body = document.getElementById("commentInput").value;
  var grade = document.getElementById("gradeSelect").selectedIndex;
  var workload = document.getElementById("workloadSelect").selectedIndex;
  var iteration = document.getElementById("iterationSelect").value;

  if(body.length < 1) {
    document.getElementById("commentInput").style.borderColor = "red";
  } else {
    var query = querystring.stringify({
      'body': body,
      'rating': grade,
      'workload': workload,
      'iteration': iteration
    });
    const url = config().dev + 'api/comment/' + window.location.href.split("/").pop();
    axios.post(url, query,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }})
    .then(response => props.setState({comments: response.data.comments})
  );
  }

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
              <h3>{data.id} - {data.name}</h3>
              <IntentObject data={["Description:", data.desc_outcome]}/>
              <IntentObject data={["Learning goals:", data.desc_content]}/>
              <IntentObject data={["Period:", data.period]}/>
              <IntentObject data={["Credits:", data.credit]}/>
              <IntentObject data={["Rating:", data.rating]}/>
              <IntentObject data={["Workload:", data.workload]}/>
            </div>
          </div>
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      </div>
    );
  }
}

function CommentList(props) {
  const data = props.props.reverse();
  const items = (data !== undefined ? data.map((comment, i) => CommentItem(comment, i)) : <div/>);
  return (
    <div>
      {items}
    </div>
  );
}

function CommentItem(props, index) {
  var arr = [1,2,3,4,5];
  const ratedStars = arr.slice(5-props.rating).map((num) => <label key={num} className="rated-star-v"/>);
  const unratedStars = arr.slice(props.rating).map((num) => <label key={num} className="unrated-star-v"/>);
  return (
    <div key={index} className="pure-g">
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="comment">
          <p>
            <span>
              <b>{props.iteration}</b>
            </span>
            <span>
              {unratedStars}{ratedStars}
            </span>
          </p>
          <p>{props.body}</p>
        </div>
      </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
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

/*function IntentStarObject(props) {
  const header = props.data[0];
  const rating = props.data[1];
  return (
    <div className="course-description">
      <div className="pure-g">
        <div className="pure-u-8-24 pure-u-sm-7-24">
          <b>{header}</b>
        </div>
        <div className="pure-u-16-24 pure-u-sm-17-24">
          <StarSystem rating={rating}/>
        </div>
      </div>
    </div>
  );
}*/

function PostComment(props) {

  return (
    <div className="pure-g">
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
        <div className="pure-form comment">
          <h3>Comment</h3>
          <textarea className="pure-u-1 commentInput" id="commentInput"/>
          {props.children}
        </div>
        </div>
      <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    </div>
  );
}

function PostCommentSelectors(props) {
  const iterations = getCourseIterations();
  const options = iterations.map( (c, i) => <option key={i}>{c}</option>);
  return (
    <div className="pure-g pure-form pure-form-stacked commentSelectors">
      <select className="pure-u-1-3" id="iterationSelect">
        {options}
      </select>
      <select className="pure-u-1-3" id="gradeSelect">
        <option>Grade - 0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <select className="pure-u-1-3" id="workloadSelect">
        <option>Workload - 0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      {props.children}
    </div>
  );
}

function InputButton(props) {
  return(
    <input className="pure-button pure-button-secondary" type="submit" id="inputButton" onClick={props.commentCourse}/>
  );
}

function getCourseIterations() {
  const courseIteration = [];
  const iterations = ["Spring", "Summer", "Fall"];
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  if(month > 8) {
    courseIteration.push(iterations[2] + " " + year);
    courseIteration.push(iterations[1] + " " + year);
    courseIteration.push(iterations[0] + " " + year);
  } else if(month > 5) {
    courseIteration.push(iterations[1] + " " + year);
    courseIteration.push(iterations[0] + " " + year);
  }
  else {
    courseIteration.push(iterations[0] + " " + year);
  }

  courseIteration.push(iterations[2] + " " + (year - 1));
  courseIteration.push(iterations[1] + " " + (year - 1));
  courseIteration.push(iterations[0] + " " + (year - 1));

  return courseIteration;
}

/*function StarSystem(props) {
  var arr = [1,2,3,4,5];
  const ratedStars = arr.slice(5-props.rating).map((num) => <label key={num} className="rated-star"/>);
  const unratedStars = arr.slice(props.rating).map((num) => <label key={num} className="unrated-star"/>);
  return (
    <span className="stars">{unratedStars}{ratedStars}</span>
  )
}*/

export default Course;
