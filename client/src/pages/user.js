import { Component } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import UserDetails from '../components/UserDetails';
import UserGames from '../components/UserGames';

class User extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/user/' + this.props.match.params.id
    })
    .then((response) => {
      this.setState({ user: response.data });
    });
  }

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header/>
        {
          this.state.user ?
            <div style={{ display: 'flex', justifyContent: "space-between", height: "85vh", padding: "1rem"}}>
              <div style={{ width: "49.5%", height: "100%"}}>
                <UserDetails user={this.state.user}></UserDetails>
                <UserGames user={this.state.user} ></UserGames>
              </div>
              <div style={{ width: "50%", height: "100%", backgroundColor: "white" }}>
                Not sure what I'll do with this space yet
              </div>
            </div>
          :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default User;
