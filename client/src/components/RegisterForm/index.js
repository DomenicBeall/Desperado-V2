import { Component } from 'react';
import './form.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

class Form extends Component {

  // Setting the form's initial state
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errors: [],
    loading: false,
    redirect: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    // Send API call to register user
    Axios({
      method: 'POST',
      url: '/api/user/register', 
      data: { username: this.state.username, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword }
    }, {withCredentials: true})
    .then((response) => {
      this.setState({ errors: [], loading: false, redirect: "/login" });
    })
    .catch((error) => {
      this.setState({ errors: error.response.data.errors, loading: false });
    });
  };

  render() {
    return (
        (this.state.redirect === "") 
        ?
        <div>
          <form className="form">
            <h1 className="subtitle">Register</h1>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
              type="text"
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
              type="text"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              value={this.state.confirmPassword}
              name="confirmPassword"
              onChange={this.handleInputChange}
              type="password"
            />


            <button className="hb-filled" onClick={this.handleFormSubmit} disabled={this.state.loading}>
            {this.state.loading ?
              <div className="loader"></div>
            :
              "Register"
            }
            </button>

            {
              (this.state.errors.length !== 0) ?
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
        </div>
        :
        <Redirect to={this.state.redirect}></Redirect>
    ); 
  }
}

Form.contextType = AuthContext;

export default Form;
