import React, { Component } from 'react';
import SearchBar from './searchBar';
import WeatherDetails from './weatherDetails.js';
import NavBar from './navbar.js'
// import AddComment from './addcomment.js'

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nameFound: null,
        nameError: false,
        loadingIndicator: false,
        cityName : null,
        cityTemperature: null,
        cityWeatherDescription: null,
        wind: null,
        humidity: null,
        maxTmp: null,
        minTmp: null,
        pressure: null,
        citySunrise: null,
        citySunset:  null,
        cityCountry: null,

      }
    console.log("Constructor of WeatherApp class loaded.");
    this.searchCity = this.searchCity.bind(this);
  }

  searchCity(name) {
    this.setState({
      nameFound: false,
      loadingIndicator: true,
      nameError: false
    })

let x = this;

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+"&appid=80186bc6ef5c092a7aa7bcdb10ea8c80&units=metric")
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    if(response.cod === "404") {
        x.setState({
          nameFound: false,
          nameError: true,
          loadingIndicator: false
        })
      }
    else if(response.cod === 200) {
      console.log("Response from openweathermap api " , response);
      let sunrise =  new Date(response.sys.sunrise*1000).toLocaleTimeString();
      let sunset =  new Date(response.sys.sunset*1000).toLocaleTimeString();

      x.setState({
        nameFound: true,
        nameError: false,
        cityName: response.name,
        cityTemperature: response.main.temp,
        cityWeatherDescription: response.weather[0].main,
        wind : response.wind.speed,
        humidity: response.main.humidity,
        maxTmp: response.main.temp_max,
        minTmp: response.main.temp_min,
        pressure: response.main.pressure,
        weatherIcon: response.weather[0].icon,
        loadingIndicator: false,
        cityCountry: response.sys.country,
        citySunrise: sunrise,
        citySunset: sunset

      })
    } 
  });
  }

  render() {
    let erMessage = this.state.nameError === true ? (
      <div
      style={{background: '#FFFFFF',  color: 'grey', textAlign:'center', boxShadow: '0px 4px 32px rgba(143, 143, 143, 0.4)', borderRadius: '4px', padding: '10px', marginTop: '10px' ,  paddingBottom: '10px'  , marginLeft: '15%',  marginRight: '15%'}}
      >
        <h4>City Name not found</h4>
      </div>
    ) : (''
    )
    let tempDetails  = this.state.nameFound === true ? (
    <WeatherDetails 
    cityName={this.state.cityName} 
    cityTemperature={this.state.cityTemperature} 
    cityWeatherDescription = {this.state.cityWeatherDescription}
    wind = {this.state.wind}
    humidity = {this.state.humidity}
    maxTmp = {this.state.maxTmp}
    minTmp = {this.state.minTmp}
    pressure = {this.state.pressure}
    weatherIcon = {this.state.weatherIcon}
    citySunset = {this.state.citySunset}
    citySunrise = {this.state.citySunrise}
    cityCountry = {this.state.cityCountry}

    ></WeatherDetails>
    
    ) : (
      this.state.loadingIndicator === true ? (
        <div
      style={{background: '#FFFFFF',  color: 'grey', textAlign:'justify', boxShadow: '0px 4px 32px rgba(143, 143, 143, 0.4)', borderRadius: '4px', padding: '10px', marginTop: '10px' ,  paddingBottom: '10px'  , marginLeft: '15%',  marginRight: '15%'}}
      >
        <h4>Searching City name...</h4>
      </div>
      ) : (' ')
    )
    return (
      <div>
        <NavBar></NavBar>
        <br/>
       <SearchBar searchCity={this.searchCity} ></SearchBar>
       {erMessage}
      {tempDetails}
      </div>
    );
  }
}

export default WeatherApp;



