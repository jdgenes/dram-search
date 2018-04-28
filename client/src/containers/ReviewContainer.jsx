import React, { Component } from 'react';
import { InfoBox, ReviewList } from '../components';

export default class ReviewContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      whiskeys: {},
      filteredWhiskeys: {},
      drams: [],
      getEachDram: {},
      searchBar: '',
      resultLimit: 24,
      dramType: 'all',
      scoreRange: [0, 100],
      priceRange: [0, 9999999],
      loading: true
    };

    this.infoBoxToggle = this.infoBoxToggle.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.setResultLimit = this.setResultLimit.bind(this);
    this.moreResultLimit = this.moreResultLimit.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.setDramType = this.setDramType.bind(this);
    this.setScoreRange = this.setScoreRange.bind(this);
    this.setPriceRange = this.setPriceRange.bind(this);
    //TODO: combine these three search filters into one function
  }

  componentDidMount () {
    this.getReviewItems();
    this.setState({loading: true});
  }

  infoBoxToggle (dramName) {
    this.setState({ getEachDram: this.state.whiskeys[dramName] });
    $('#info-box-container').modal();
  }

  getReviewItems () {
    fetch('http://localhost:5000/drams', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(data => {
      let whiskeysByName = {};
      for (var whiskey in data) {
        const existingWhiskey = whiskeysByName[data[whiskey].scotch_name];
        if (existingWhiskey == undefined) {
          // If no scotch_name key exists, add key of scotch_name with array containing dram object
          whiskeysByName[data[whiskey].scotch_name] = new Array(data[whiskey]);
        } else if (existingWhiskey != undefined) {
          // Else append dram object to scotch_name key
          existingWhiskey.push(data[whiskey]);
        }
        
      }
      this.setState({ whiskeys: whiskeysByName, drams: data, loading: false });
    });
  }

  setSearchBar (event) { 
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  setResultLimit (event) {
    this.setState({ resultLimit: event.target.value });
  }

  moreResultLimit (event) {
    this.setState({ resultLimit: this.state.resultLimit + 24 });
  }

  setDramType (event) {
    this.setState({ dramType: event.target.value });
  }

  setPriceRange (event) {
    this.setState({ priceRange: event.target.value.split('-').map(Number) });
  }

  setScoreRange (event) {
    this.setState({ scoreRange: event.target.value.split('-').map(Number) });
  }

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render () {
    const { loading, whiskeys, filteredWhiskeys, getEachDram, searchBar, resultLimit, dramType, scoreRange, priceRange } = this.state;
    return (
      <div className="page-content">
        <InfoBox whiskeys={whiskeys} dram={getEachDram} />
        <ReviewList
	  loading={loading}
          whiskeys={whiskeys}
          filteredWhiskeys={filteredWhiskeys}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          infoBoxToggle={this.infoBoxToggle}
          resultLimit={resultLimit}
          moreResultLimit={this.moreResultLimit}
          scrollToTop={this.scrollToTop}
          setResultLimit={this.setResultLimit}
          setDramType={this.setDramType}
          setPriceRange={this.setPriceRange}
          setScoreRange={this.setScoreRange}
          dramType={dramType}
          priceRange={priceRange}
          scoreRange={scoreRange}
          

        />
      </div>
    );
  }
}
