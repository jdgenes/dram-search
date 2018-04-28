import React, { Component } from 'react';
import { Link } from 'react-router';
import ReviewItem from './ReviewItem';

export default class ReviewList extends Component {
  render () {
    const { loading, whiskeys, searchBar, setSearchBar, infoBoxToggle, resultLimit, dramType, scoreRange, priceRange, setResultLimit, moreResultLimit, scrollToTop, setDramType, setScoreRange, setPriceRange } = this.props;

    const keys = Object.keys(whiskeys);
    // Iterate through each object in array created by keys(), find arrays containing objects with the
    // values filtered for in state.

    var whiskeySet = new Set;
    var filteredWhiskeys = [];

    keys.forEach(i => {

      whiskeys[i].forEach(x => {

        if (dramType === 'all') {
          
          if ((x.score >= scoreRange[0]) && (x.score <= scoreRange[1]) && (x.price >= priceRange[0]) && (x.price <= priceRange[1])) {
            
              whiskeySet.add(x.scotch_name);
          }
        }

        if (x.type.toLowerCase() === dramType) {
          if ((x.score >= scoreRange[0]) && (x.score <= scoreRange[1]) && (x.price >= priceRange[0]) && (x.price <= priceRange[1])) {
            
              whiskeySet.add(x.scotch_name);

          }
        }

        if (dramType === 'other') {

          if ((x.type.toLowerCase() !== 'canada') && (x.type.toLowerCase() !== 'blend') && (x.type.toLowerCase() !== 'ireland') && (x.type.toLowerCase() !== 'lowland') && (x.type.toLowerCase() !== 'highland') && (x.type.toLowerCase() !== 'speyside') && (x.type.toLowerCase() !== 'islay') && (x.score >= scoreRange[0]) && (x.score <= scoreRange[1]) && (x.price >= priceRange[0]) && (x.price <= priceRange[1])) {
            
            whiskeySet.add(x.scotch_name);
            
          }
        }
      })
    });
    // TODO: combine with above functions to avoid the duplication in effort: object -> array -> set -> array
    whiskeySet.forEach(i => {
      filteredWhiskeys.push(i);
    })
    
    if (loading){
      return(<div className="container review-container">
      <div className="row">
        <div className="col-xs-12 loader margin-top-double"></div>
      </div>
      </div>)
    }
    
    return (
      <div className="page-content">
        <div className="container review-container">
          <div className="row review-row">

          <div className="col-xs-12" id="dram-search">
            <div id="dram-search-inside">
              <div className="row review-row">  
                <div className="col-xs-12">
                  <input type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
                </div>
                  <div className="col-xs-12 col-sm-4">
                    <select className="drop-down form-control" name="dramType" onChange={setDramType}>
                      <option value="all">Type</option>
                      <option value="speyside">Speyside</option>
                      <option value="islay">Islay</option>
                      <option value="highland">Highland</option>
                      <option value="lowland">Lowland</option>
                      <option value="ireland">Irish</option>
                      <option value="blend">Blend</option>
                      <option value="canada">Canadian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <select className="drop-down form-control" name="scoreRange" onChange={setScoreRange}>
                      <option value="0-100">Score</option>
                      <option value="95-100">95-100</option>
                      <option value="90-95">90-95</option>
                      <option value="80-90">80-90</option>
                      <option value="70-80">70-80</option>
                      <option value="50-70">50-70</option>
                      <option value="0-50">Under 50</option>
                    </select>
                  </div>
                  <div className="col-xs-12 col-sm-4">
                    <select className="drop-down form-control" name="priceRange" onChange={setPriceRange}>
                      <option value="1-9999999">Price</option>
                      <option value="1-50">Under $50</option>
                      <option value="50-100">$50-$100</option>
                      <option value="100-200">$100-$200</option>
                      <option value="200-500">$200-$500</option>
                      <option value="500-1000">$500-$1000</option>
                      <option value="1000-9999999">Over $1000</option>
                    </select>
                  </div>
              </div>
            </div>
          </div>
            

            <div className="row">
            
            {
              
              filteredWhiskeys
                .filter(dramName => dramName.toLowerCase().includes(searchBar))
                .map((dramName, i) => {
                  if (i < resultLimit){
                    return (
                    <ReviewItem
                      dramName={dramName}
                      key={i}
                      whiskeys={whiskeys}
                      infoBoxToggle={infoBoxToggle}
                    />
                    );
                  
                }
              })

            }
            </div>
            <div className="col-xs-6">
              <button className="review-btn btn btn-lg btn-bottom" name="limit" value={24} onClick={moreResultLimit}>Show More</button>
            </div>
            <div className="col-xs-6">
              <button className="review-btn btn btn-lg btn-bottom" onClick={scrollToTop}>Return to Top</button>
            </div>           
          </div>
        </div>
      </div>

    );
  }
}
