import { Component } from 'react';
import { AuthContext } from '../../context/auth';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';
import supercluster from 'points-cluster';

import "./map.css";
import iconPawn from '../../assets/icon-pawn.svg';
import iconCluster from '../../assets/icon-cluster.svg';
import GameSelectPanel from '../GameSelectPanel';

class WorldMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      games: [], 
      location: { lat: 60.814305, lng: 47.051773 },
      clusters: [],
      selectedGame: null
    };

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleGameAccept = this.handleGameAccept.bind(this);
  }

  getClusters = props => {
    this.state.games.forEach(element => {
      element.lat = element.location.lat;
      element.lng = element.location.lng;
    });

    const clusters = supercluster(this.state.games, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

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

  handleGameSelect(game) {
    if (this.state.selectedGame === game) {
      this.setState({ selectedGame: null });
    } else {
      this.setState({ selectedGame: game });
    }
  }

  handleGameAccept(game) {
    Axios({
      method: 'POST',
      url: '/api/games/accept/' + game._id, 
      data: { user_id: this.context.user._id }
    }, {withCredentials: true})
    .then((response) => {
      //this.setState({ errors: [], loading: false, redirect: "/login" });
    })
    .catch((error) => {
      //this.setState({ errors: error.response.data.errors, loading: false });
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <GameSelectPanel handleGameAccept={this.handleGameAccept} game={this.state.selectedGame} />

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyALoz7rDY5iHKbGa9gWh_0EtaITjIXAQzc" }}
          center={(this.state.location)}
          defaultZoom={11}
          onChange={this.handleMapChange}
        >

        {this.state.clusters.map((item, index) => {
            if (item.numPoints === 1) {
              return (
                <MapMarker key={index} item={item} index={index} lat={item.points[0].lat} lng={item.points[0].lng} selectGame={this.handleGameSelect}/>
              );
            }

            return (
                <ClusterMarker key={index} item={item} index={index} lat={item.points[0].lat} lng={item.points[0].lng} />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

function MapMarker(props) {
  return (
    <div onClick={() => {props.selectGame(props.item.points[0])}} className="map-icon-parent">
      <img src={iconPawn} alt="Pawn icon" className="map-icon"></img>
    </div>
  );
}

function ClusterMarker(props) {
  return(
    <div className="cluster-parent-icon">
      <img src={iconCluster} alt="Pawn icon" className="cluster-icon" ></img>
      <p className="cluster-num">{props.item.numPoints}</p>
    </div>
  );
}

WorldMap.contextType = AuthContext;

export default WorldMap;
