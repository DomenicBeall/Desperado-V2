import { Component } from 'react';
import { AuthContext } from '../../context/auth';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';

import "./map.css";
import iconPawn from '../../assets/icon-pawn.svg';

class WorldMap extends Component {

  constructor(props) {
    super(props);

    this.state = {games: [], location: { lat: -37.8136, lng: 144.9631 }};
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ location: { lat: position.coords.latitude, lng: position.coords.longitude }});
      });
    }

    this.getGames();
  }

  getGames() {
    // Make call to API
    Axios({
      method: 'GET',
      url: '/api/games/getAll'
    })
    .then((response) => {
      this.setState({ games: response.data });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyALoz7rDY5iHKbGa9gWh_0EtaITjIXAQzc" }}
          center={(this.state.location)}
          defaultZoom={11}
        >

        {
          (this.state.games.length > 0)
          ?
            this.state.games.map((element, index) => {
              return <img src={iconPawn} alt="Pawn icon" className="map-icon" key={index} lat={element.location.lat} lng={element.location.lng}></img>
            })
          :
          <></>
        }

        </GoogleMapReact>
      </div>
    );
  }
}

WorldMap.contextType = AuthContext;

export default WorldMap;
