import { Component } from 'react';
import { AuthContext } from '../context/auth';

import Header from '../components/Header';
import UserDetails from '../components/UserDetails';
import UserGames from '../components/UserGames';

class User extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Header/>
        <div style={{ display: 'flex', justifyContent: "space-between", height: "85vh", padding: "1rem"}}>
          <div style={{ width: "49.5%", height: "100%"}}>
            <UserDetails user={this.context.user}></UserDetails>
            <UserGames user={this.context.user} ></UserGames>
          </div>
          <div style={{ width: "50%", height: "100%", backgroundColor: "white" }}>
            ass
          </div>
        </div>
      </div>
    );
  }
}

User.contextType = AuthContext;


export default User;
