import React, { Component } from 'react';
import axios from 'axios';
import config from './_environment.js';
import querystring from 'query-string';
import './styles/App.css';

class Course extends Component {

  constructor(props) {
      super(props);
      this.state = {data: {}, comments: [], isAdmin: !!sessionStorage.getItem('token')};
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
        <CommentList className="commentList" state={this} admin={this.state.isAdmin}/>
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

function handleDeleteResponse(response, state) {
  state.setState({comments: response.data.comments});
}

function commentCourse(props) {
  var body = document.getElementById("commentInput").value;
  var grade = document.getElementById("gradeSelect").selectedIndex;
  var workload = document.getElementById("workloadSelect").selectedIndex;
  var iteration = document.getElementById("iterationSelect").value;

  if(body.length < 1) {
    document.getElementById("commentInput").style.borderColor = "red";
  } else {
    const query = querystring.stringify({
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
    .then(response => {
      props.setState({comments: response.data.comments});
      document.getElementById("commentInput").value = "";
    }
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
              <IntentObject data={["Oodi:", <a href={"https://oodi.aalto.fi/a/opintjakstied.jsp?html=1&Kieli=4&Tunniste=" + data.id}>Enroll in Oodi</a>]}/>
              <IntentStarObject data={["Rating:", data.rating, true]}/>
              <IntentStarObject data={["Workload:", data.workload, false]}/>
            </div>
          </div>
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      </div>
    );
  }
}

function CommentList(props) {
  const data = props.state.state.comments.reverse();
  const isAdmin = props.admin;
  const items = (data !== undefined ? data.map((comment, i) => CommentItem(comment, i, isAdmin, props.state)) : <div/>);
  return (
    <div>
      {items}
    </div>
  );
}

function deleteComment(e, comment, state) {
  const token = sessionStorage.getItem('token');
  const url = config().dev + 'api/comment/remove/' + comment.id;
  const query = querystring.stringify({
    'token': token
  });
  axios.post(url, query,
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }}).then(response => {
      if(!!response.data.comments) handleDeleteResponse(response, state);
      else alert('Session expired')
    })
}

function CommentItem(props, index, isAdmin, state) {
  const ratedStars = Array(props.rating).fill(null).map((num, index) => <i key={index} className="fa fa-star" aria-hidden="true"></i>);
  const workload = Array(props.workload).fill(null).map((num, index) => <i key={index} className="fa fa-ambulance" aria-hidden="true"></i>);
  return (
    <div key={index} className="pure-g">
    <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
    <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
    {isAdmin && <i className="fa fa-times" aria-hidden="true" style={{margin: '10px'}} onClick={(e) => deleteComment(e, props, state)}/>}
      <div className="comment">
        <p><b>{props.iteration}</b> <span>{ratedStars}</span></p>
        <p><span>{workload}</span></p>
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

function IntentStarObject(props) {
  const header = props.data[0];
  const rating = props.data[1];
  return (
    <div className="course-description">
      <div className="pure-g">
        <div className="pure-u-8-24 pure-u-sm-7-24">
          <b>{header}</b>
        </div>
        <div className="pure-u-16-24 pure-u-sm-17-24">
          <StarSystem rating={rating} icon={props.data[2]}/>
        </div>
      </div>
    </div>
  );
}

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
        <option>Rating - 0</option>
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

function StarSystem(props) {
  var arr = [1,2,3,4,5];
  const ratedStars = arr.slice(5-props.rating).map((num) => (
    props.icon ? <i key={num} className="fa fa-star star-left" aria-hidden="true"></i>
    : <i key={num} className="fa fa-ambulance star-left" aria-hidden="true"></i>
  ))
  return (
    <span className="stars">{ratedStars} ({Math.round((props.rating) * 100) / 100})</span>
  )
}

export default Course;
