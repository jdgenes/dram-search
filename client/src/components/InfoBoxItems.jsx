import React, { Component } from 'react';

export default class InfoBoxItems extends Component {
    
    render () {
      const { item } = this.props;
      if (item !== undefined) {
        var price = item.price;
        if (price === '0') {
            price = 'N/A';
        }
        else {price = '$' + item.price}
      }

      return(
          <div className="dram-header">
            <div className="col-xs-12">
                <h2 className="dram-name">{item === undefined ? 'not defined' : item.scotch_name}
                <br />
                <h2 className="small">{item === undefined ? 'not defined' : item.type}</h2>
                </h2>
            </div>
            <div className="col-xs-12 info-box-inside">
                <div className="row">
                    <div className="col-xs-12 margin-top margin-bottom">
                        <strong>Reviewer: {item === undefined ? 'not defined' : item.user}</strong>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <strong>Score: {item === undefined ? 'not defined' : item.score}</strong>
                    </div>
                    <div className="col-xs-4">
                        <strong>Amount Paid: {item === undefined ? 'not defined' : price}</strong>
                    </div>
                    <div className="col-xs-4">
                        <strong>Reviewed {item === undefined ? 'not defined' : item.review_date}</strong>
                    </div>
                </div>
                <div className="col-xs-12">
                    <a className="review-link btn btn-md review-btn center-block margin-top" href={item === undefined ? 'not defined' : item.review_url}>Read the review on Reddit</a>
                </div>
            </div>
        </div>

      );
    } 
}
