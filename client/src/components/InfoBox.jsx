import React, { Component } from 'react';
import InfoBoxItems from './InfoBoxItems';

export default class InfoBox extends Component {
  
  render () {
    const { dram } = this.props;
    if (dram[0] !== undefined) {return(

        <div className="modal fade" id="info-box-container">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <button className="review-btn close-btn-top" data-dismiss="modal">Close</button>
                <div className="row info-box-row">
                  {
                      dram.map((item, i) => {                
                        return (
                          
                          <InfoBoxItems
                            item={item}
                            key={i}
                          />
                        );
                      
                    })
                      
                  }
                </div>
                <button className="review-btn close-btn-bottom" data-dismiss="modal">Close</button>
              </div>
            </div>
        </div>
      

    );} else {
      return(
        <div className="modal fade" id="info-box-container">
            <div className="modal-dialog" role="document">

            </div>
        </div>
      );
    }
    
  }
}
