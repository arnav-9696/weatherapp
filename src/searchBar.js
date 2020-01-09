import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityname : null,
            }
        this.searchInp = this.searchInp.bind(this);
      }
      updateName(e) {
        this.setState({ cityname: e.target.value })
      }

searchInp() {
    console.log('Fired');
    this.props.searchCity(this.state.cityname);
}
  render() {
    return (
      <div
      style={{textAlign: 'center'}}>
<input
									placeholder="Enter City Name:"
                  value={this.state.cityname}
                  style={{ fontSize: '28px' ,width: '600px', background: '#FFFFFF', boxShadow: '0px 4px 32px rgba(143, 143, 143, 0.4)', borderRadius: '4px', border: '1px solid #E5E5E5', color: '#8C8C99' , boxSizing: 'border-box', borderRadius: '4px', padding: '5px'}}
									onChange={e => this.updateName(e)}
								/>  
    <button 
       onClick={this.searchInp}
       style={{ background: '#3251ED', color: 'white', fontSize: '33px',cursor: 'pointer' , boxShadow: '0px 4px 32px rgba(143, 143, 143, 0.4)', borderRadius: '4px',}}
        >Search</button>
      </div>
    );
  }
}
SearchBar.propTypes = {
    searchCity: PropTypes.func
  };
export default SearchBar;