import React from "react";
import * as api from "./Api";
import { navigate } from "@reach/router";
import "./SignUp.css";

export default class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    businessName: "",
    businessEmail: "",
    addressOne: "",
    addressTwo: "",
    townCity: "",
    postCode: "",
    logo: "",
    description: "",
    err: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      password,
      businessName,
      businessEmail,
      addressOne,
      addressTwo,
      townCity,
      postCode,
      logo,
      description,
      err
    } = this.state;
    const business = {
      address: addressOne + " " + addressTwo + " " + townCity + " " + postCode
    };

    api
      .register({
        business_name: businessName,
        username,
        password,
        email: businessEmail,
        address: business.address,
        description,
        url: logo
      })
      .then(response => {
        this.setState({
          username: "",
          password: "",
          businessName: "",
          businessEmail: "",
          addressOne: "",
          addressTwo: "",
          townCity: "",
          postCode: "",
          logo: "",
          description: "",
          err: null
        });
        alert("Sign up successful, please log in!")
        navigate("/");
      })
      .catch(response =>
        this.setState({ err: { msg: "You did something wrong! :(" } })
      );
  };

  render() {
    const {
      username,
      password,
      businessName,
      businessEmail,
      addressOne,
      addressTwo,
      townCity,
      postCode,
      logo,
      description
    } = this.state;
    return (
      // <div className="container">
      <div className="signUpContainer">
        <h2 className="signUpTitle">New to FOMO business? Register now</h2>

        <form className="regForm" onSubmit={this.handleSubmit}>
          <div>
            <label className="address">
              Username:
            <input
              className="regFormInput"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            /></label>
            <label className="address">
            <div></div>Password:
            <input
              className="regFormInput"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            /></label>
            <label className="address">
              <div></div>Business Name:
            <input
              className="regFormInput"
              type="text"
              placeholder="Business Name"
              name="businessName"
              value={businessName}
              onChange={this.handleChange}
              required
            /></label>
            {/* <br /> */}
            <label className="address">
              <div></div>Business Email:
            <input
              className="regFormInput"
              type="email"
              placeholder="Business Email"
              name="businessEmail"
              value={businessEmail}
              onChange={this.handleChange}
              required
            /></label>
            {/* <br /> */}
            {/* Address <br /> */}
            <label className="address">
             <div></div> Address:
            <input
              className="regFormInput"
              type="text"
              placeholder="Address"
              name="addressOne"
              value={addressOne}
              onChange={this.handleChange}
              required
            /></label>
            <label></label>
            <input
              className="regFormInput"
              type="text"
              placeholder="Town/City"
              name="townCity"
              value={townCity}
              onChange={this.handleChange}
              required
            />
            <input
              className="regFormInput"
              type="text"
              placeholder="Post Code"
              name="postCode"
              value={postCode}
              onChange={this.handleChange}
              required
            />
            {/* <br /> */}
            <label className="address">
              <div></div>Logo url:
            <input
              className="regFormInput"
              type="text"
              placeholder="Logo"
              name="logo"
              value={logo}
              onChange={this.handleChange}
            /></label>
          </div>
          {/* <br /> */}
          <div>
            <label className="address">
              <div>Description:</div>
            <textarea
              className="regFormTextArea"
              rows="4"
              placeholder="Description"
              name="description"
              value={description}
              onChange={this.handleChange}
              required
            /></label>
          </div>
          {/* <br /> */}
          <div>
            <button className="regFormButton" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
      /* </div> */
    );
  }
}
