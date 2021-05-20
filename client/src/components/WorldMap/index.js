import { Component } from 'react';
import { AuthContext } from '../../context/auth';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';
import supercluster from 'points-cluster';

import "./map.css";
import iconPawn from '../../assets/icon-pawn.svg';
import iconPawnHollow from '../../assets/icon-pawn-hollow.svg';
import iconCluster from '../../assets/icon-cluster.svg';

class WorldMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      games: [], 
      location: { lat: 60.814305, lng: 47.051773 },
      clusters: []
    };
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

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyALoz7rDY5iHKbGa9gWh_0EtaITjIXAQzc" }}
          center={(this.state.location)}
          defaultZoom={11}
          onChange={this.handleMapChange}
        >

        {this.state.clusters.map((item, index) => {
            if (item.numPoints === 1) {
              return (
                <MapMarker key={index} item={item} index={index} lat={item.points[0].lat} lng={item.points[0].lng}/>
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
    <div onClick={() => {console.log(props.item)}} className="map-icon-parent">
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
