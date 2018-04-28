import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Welcome extends Component {
  
  render () {

    return (
      <div className="page-content">
        <div className="container card-container">
            <div className="row review-row margin-top-double">
              <div className="col-xs-12">
              <h1 className="header">Dram Search</h1>
              </div>
              <div className="col-xs-6">
                <p>Quickly search the community review archive sourced from Reddit's <a href="https://www.reddit.com/r/Scotch/">/r/Scotch.</a></p>
              </div>
              <div className="col-xs-6">
                <Link className="btn btn-lg review-btn" to="/drams">Begin Search</Link>
              </div>
          </div>
        </div>

        <div className="container card-container">
          <div className="row review-row">
            <h1 className="header">About</h1>
            <p>
              This project was created in my personal time to both help out the Scotch community on Reddit, and to learn more about web development by using React and JavaScript.
              
            </p>
            <p>
              If you have any questions, comments, or suggestions, please feel free to send me a message.
            </p>
          </div>
        </div>

        <div id="card-1" className="container card-container">
          <div className="row review-row">
            <h1 className="header">Contact</h1>
            <p>
              If you're interested in this project, please check out my Twitter and Github profiles below.
            </p>
            <br />
              <div className="col-xs-12 socials">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-github-square"></i></a>
              </div>
          </div>
        </div>

      </div>
    );
  }
}
