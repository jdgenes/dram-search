import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  active (path) {
    if (this.props.location.pathname === path) {
      return 'active';
    }
  }
  render () {
    return (
      <div className="root-content">
          <nav className="navbar">
            <ul>
              <li className={this.active('/')}><Link className="btn btn-lg nav-btn" to="/">Home</Link></li>
              <li className={this.active('/drams')}><Link className="btn btn-lg nav-btn" to="/drams">Browse Whiskeys</Link></li>
            </ul>
          </nav>
          <div classname="container">
            <row className="row">
              <div className="col-xs-12 banner-row">
              </div>
            </row>
          </div>
        {this.props.children}
        <div>
          <footer className="footer">
            <div className="container">
              <div className="row footer-row">
                <div className="col-xs-4">
                  Copyright 2018 Dram Search
                </div>
                <div className="col-xs-4">
                  Visit the community of Scotch enthusiasts and reviewers on Reddit at <a href="https://www.reddit.com/r/Scotch/"><strong>/r/Scotch.</strong></a>
                </div>
                <div className="col-xs-4">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-github-square"></i></a>
                </div>
            </div>
          </div>

          </footer>
        </div>
      </div>
    );
  }
}
