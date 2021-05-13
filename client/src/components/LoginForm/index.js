import { Component } from 'react';
import './form.css';

import { AuthContext } from '../../context/auth';

class Form extends Component {

  // Setting the form's initial state
  state = {
    email: "",
    password: ""
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

    this.context.login(this.state.email, this.state.password);

    this.setState({
        email: "",
        password: ""
    });
  };

  render() {
    return (
      <div>
        <form className="form">
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

          <button className="hb-filled" onClick={this.handleFormSubmit}>Sign In</button>
        </form>
      </div>
    ); 
  }
}

Form.contextType = AuthContext;

export default Form;
