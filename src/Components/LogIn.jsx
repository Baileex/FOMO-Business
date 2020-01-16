import React from "react";
import * as api from "./Api";
import { navigate } from "@reach/router";
import ErrorDisplay from "./ErrorDisplay";
import "./Login.css";

export default class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    err: null,
    access_token: "",
    businessName: ""
  };

  componentDidUpdate() {
    // this.handleSubmit(e)
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { getUser } = this.props;
    e.preventDefault();

    const { username, password } = this.state;

    api
      .logIn({ username, password })
      .then(response => {
        getUser(
          response.access_token,
          response.details.username,
          response.details.business_name,
          response.details.business_id
        );
        this.setState({
          username: response.details.username,
          password: "",
          err: null,
          access_token: response.access_token,
          business_name: response.details.business_name
        });
        navigate("/events");
      })
      .catch(response =>
        this.setState({
          err: { msg: "Your username and password don't match" }
        })
      );
  };

  render() {
    const { password, username, err, access_token } = this.state;
    return (
      // <div className="LoginContainerOuter">
      <div className="LoginContainer">
        <form className="LoginForm" onSubmit={this.handleSubmit}>
          <h2 className="LoginFormTitle">FOMO</h2>
          <input
            className="LoginFormInput"
            type="text"
            placeholder="Username"
            required
            onChange={this.handleChange}
            name="username"
            value={username}
          />
          {/* <br /> */}
          <input
            className="LoginFormInput"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            name="password"
            value={password}
            required
          />
          {/* <br /> */}
          {err && <ErrorDisplay error={err} />}
          {/* <br /> */}
          <p className="LoginFormForgot">Forgot your password?</p>
          <button type="submit" className="LoginFormButton">
            Sign In
          </button>
        </form>
      </div>
      // </div>
    );
  }
}
