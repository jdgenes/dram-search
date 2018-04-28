import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {
  render () {
    return (
      <div className="view">
        <div className="review-items">
        {this.props.children}
        </div>
      </div>
    );
  }
}
