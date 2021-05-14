import { Component } from 'react';
import './form.css';

import { AuthContext } from '../../context/auth';

class Form extends Component {

  // Setting the form's initial state
  state = {
    email: "",
    password: "",
    error: false,
    loading: false
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

    this.context.login(this.state.email, this.state.password)
    .then((token) => {
      this.setState({ error: false });
    })
    .catch((err) => {
      this.setState({ error: true });
    })
    .then(() => {
      this.setState({ password: "", loading: false});
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

          <button className="hb-filled" onClick={this.handleFormSubmit} disabled={this.state.loading}>
          {this.state.loading ?
            <div class="loader"></div>
          :
            "Sign In"
          }
          </button>

          {
            this.state.error ?
              <div className="error-msg">Please enter valid login details and retry.</div>
              :
              <></>
          }
        </form>
      </div>
    ); 
  }
}

Form.contextType = AuthContext;

export default Form;
