import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Headers from './Headers';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      temp: '',
      cityName: '',
      weather: '',
      high: '',
      low: '',
      icon: '',
      isRaining: '',
      showModal: true,
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    window.M.Modal.init(elems);
    this.getCityWeather('copenhagen');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.weather !== prevState.weather) {
      const isRaining = this.state.weather.includes('rain');
      if (isRaining) {
        this.setState({
          isRaining: 'Rain rain go away',
        });
      } else {
        this.setState({
          isRaining: '',
        });
      }
    }
  }

  searchCity = (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    this.getCityWeather(city);
  };

  getCityWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`;
    axios.get(url).then((res) => {
      this.setState({
        temp: res.data.main.temp,
        high: res.data.main.temp_max,
        low: res.data.main.temp_min,
        weather: res.data.weather[0].description,
        icon: res.data.weather[0].icon,
        cityName: res.data.name,
      });
    });
  };

  removeModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`;
    return (
      <div className='App'>
        <div className='row'>
          <div className='col s6 offset-s3'>
            <button onClick={this.removeModal} class='btn'>
              Remove from DOM !
            </button>
            <Headers temp={this.state.temp} isReaining={this.state.isRaining} />
            <a
              className='waves-effect waves-light btn modal-trigger'
              href='#modal1'
            >
              Details
            </a>
            <form onSubmit={this.searchCity}>
              <input type='text' id='city' placeholder='Enter a city name' />
            </form>
          </div>
        </div>

        {this.state.showModal ? (
          <Modal
            iconUrl={iconUrl}
            weather={this.state.weather}
            cityName={this.state.cityName}
            low={this.state.low}
            high={this.state.high}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default App;
