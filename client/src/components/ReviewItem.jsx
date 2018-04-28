import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ReviewItem extends Component {
  render () {
    const { dramName, whiskeys, infoBoxToggle } = this.props;
    return (
      <div className="col-xs-6 col-sm-4 col-lg-3 dram-box">
        <row>
          <div className="col-xs-12">
            <strong>{dramName}</strong>
          </div>
          <div className="col-xs-12 navbar-btn">
            <button className="btn review-btn btn-block" onClick={() => infoBoxToggle(dramName)}>Show {whiskeys[dramName].length === 1 ? 'Review' : whiskeys[dramName].length + ' Reviews'}</button>
          </div>
        </row>
      </div>
    );
  }
}
