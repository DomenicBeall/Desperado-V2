import { Component } from 'react';
import './form.css';

import { AuthContext } from '../../context/auth';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {

  constructor(props) {
    super(props);

    // Setting the form's initial state
    this.state = {
      dateTime: "",
      location: { lat: null, lng: null},
      timeControl: "",
      loading: false,
      errors: [],
      redirect: ""
    };
  }


  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleDateChange = time => {
    this.setState({ dateTime: time });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    // Make call to API
    Axios({
      method: 'POST',
      url: '/api/games/create', 
      data: { 
        dateTime: this.state.dateTime, 
        location: this.state.location, 
        timeControl: this.state.timeControl,
        challenger: this.context.user._id 
      }
    }, {withCredentials: true})
    .then((response) => {
      this.setState({ redirect: "/" });
    })
    .catch((error) => {
      this.setState({ errors: [...error.response.data.errors], loading: false });
    });
  };

  parseLocation = (location) => {
    const placeID = location.value.place_id;
    const placeName = location.label;

    geocodeByPlaceId(placeID)
      .then(results => getLatLng(results[0]))
      .then((coords) => {
        console.log({...coords, placeName});
        this.setState({ location: {...coords, placeName} });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
      {
        (this.state.redirect === "") ?
          <form className="form">
            <h1 className="subtitle">Create Game</h1>

            <label htmlFor="email">Where</label>
            <GooglePlacesAutocomplete 
              apiKey="AIzaSyALoz7rDY5iHKbGa9gWh_0EtaITjIXAQzc"
              selectProps={{
                placeholder: "Select a place...",
                onChange: (value) => {this.parseLocation(value)},
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: 'black',
                    fontSize: '1rem'
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: 'black',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'black',
                  })
                }
              }}
            />

            <label htmlFor="dateTime" style={{ marginTop: "1rem" }}>When</label>
            <DatePicker
                onChange={this.handleDateChange}
                minDate={new Date("02-29-2020")}
                maxDate={new Date("02-29-2021")}
                showTimeSelect
                placeholderText="Select a time..."
            />

            <label htmlFor="timeControl">Time control</label>
            <select name="timeControl" id="timeControl" onChange={this.handleInputChange}>
              <option value="Bullet">Bullet</option>
              <option value="Blitz">Blitz</option>
              <option value="Rapid">Rapid</option>
              <option value="Classical">Classical</option>
            </select>

            <button className="btn-filled" onClick={this.handleFormSubmit} disabled={this.state.loading}>
            {this.state.loading ?
              <div className="loader"></div>
            :
              "Create game!"
            }
            </button>

            {
              (this.state.errors.length > 0) ?
                  <ul className="error-msg">
                    {
                      this.state.errors.map((error, index) => {
                        return (<li key={index}>{error}</li>);
                      })
                    }
                  </ul>
                :
                <></>
            }
          </form>
        :
          <Redirect to={this.state.redirect}/>
      } 
      </div>
    ); 
  }
}

Form.contextType = AuthContext;

export default Form;
