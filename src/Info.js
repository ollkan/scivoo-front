import React, { Component } from 'react';
import './styles/App.css';

class Info extends Component {

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
          <div className="pure-u-1 pure-u-md-18-24 pure-u-lg-14-24">
            <div className="info">
              <h3>Welcome to Varjo-opinto-opas!</h3>
              <p>
                In Varjo-opinto-opas you can search Aalto University courses by their number of credits and/or the teaching periods of
                the course. You can also read comments about the course from fellow students
                and comment the course yourself.
              </p>
              <div>
                <p>
                You can add your own experiences of a course by filling in the fields at the bottom of a course page. Your comments could include:
                </p>
                <ul className="infoList">
                  <li>What kind of exercises were included in the course (weekly assignments, reports, exams etc.)</li>
                  <li>Were the lectures useful or obligatory?</li>
                  <li>What type of studies does this course complement, is it vital for a certain minor?</li>
                  <li>Overall opinions about the course!</li>
                </ul>
              </div>
              <p>
              Finally, once you have completed the course, choose what grade (0-5)
               you would evaluate the course and how you would rate the workload
               of the course (0 being very low and 5 a high workload).
              </p>
              <div>
                <p>
                  Please keep your comments constructive. Inappropriate comments
                  (swearing, personal critique about the course staff, answers to assignments etc.)
                  will be removed and are a threat to the existence of the Varjo-opinto-opas.
                </p>
                <p><b>Please use common sense.</b></p>
              </div>
              <p>
              Varjo-opinto-opas is not an official channel for feedback and the
               comments will not be forwarded to the University. This is purely a
               project by students for students. In the case of problems contact
               the person responsible for study affairs in your guild.
              </p>
              <p>
              <a href="https://goo.gl/forms/mWVL1HK79jdmM73N2">
                <b>If you find bugs or have feedback please let us know</b>
              </a>
              </p>
            </div>
          </div>
        <div className="pure-u-md-3-24 pure-u-lg-5-24"/>
      </div>
    );
  }
}
//<img src={logo} className="App-logo" alt="logo" />
export default Info;
