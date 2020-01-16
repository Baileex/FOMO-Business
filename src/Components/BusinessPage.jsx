import React from "react";
import * as api from "./Api";
import ErrorDisplay from "./ErrorDisplay";

export default class BusinessPage extends React.Component {
  state = {
    username: "",
    passwordOne: "",
    passwordTwo: "",
    businessName: "",
    email: "",
    address: "",
    townCity: "",
    postCode: "",
    description: "",
    err: null
  };

  handleChange = e =>  {
   const {name, value} = e.target
   this.setState({[name]: value})
  }

  handlePasswordChange = e => {
    e.preventDefault();
    const {business_name} = this.props
    const {passwordOne, passwordTwo} = this.state
    if (passwordOne === passwordTwo){
      api.changePassword(business_name, {password: passwordTwo}).then(response => console.log(response)).catch(response => console.log(response))
    }else{
      this.setState({err: {msg: "Please ensure the both passwords match"}})
    }
  };

  handleBusinessChange = e => {
    e.preventDefault();
    const { business_name } = this.props;
    const {businessName, address, description, email, postCode, townCity} = this.state
    const params = {business_name: businessName, address: address + " " + townCity + " " + " " + postCode, email, description}
    api
      .changeBusinessDetails(business_name, params)
      .then(response => console.log(response))
      .catch(response => console.log(response));
  };

  handleUsernameChange = e => {
    e.preventDefault();
    const { business_name } = this.props;
    const { username } = this.state;
    api
      .changeUsername(business_name, { username })
      .then(response => console.log(response))
      .catch(response => console.log(response));
  };

  render() {
    const {
      username,
      passwordOne,
      passwordTwo,
      businessName,
      email,
      address,
      townCity,
      postCode,
      description,
      err
    } = this.state;
    return (
      <div className="events-form">
        <h1 className="postevent-title">CHANGE DETAILS</h1>
        <form onSubmit={this.handleUsernameChange}>
          <label className="address">
            Change Username:
            <input
              type="text"
              placeholder="new username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
              className="nameInput"
            />
          </label>
          <button type="submit" className="event-regButton">
            Change Username
          </button>
        </form>
        <br />

        <form onSubmit={this.handlePasswordChange}>
          <label className="address">
            Change Password:
            <input
              type="password"
              name="passwordOne"
              placeholder="new password"
              value={passwordOne}
              onChange={this.handleChange}
              required
              className="addInput"
            />
          </label>
          <input
            type="password"
            name="passwordTwo"
            placeholder="re-type password"
            value={passwordTwo}
            onChange={this.handleChange}
            required
            className="addInput"
          />
          {err && <ErrorDisplay error={err} />}
          <button type="submit" className="event-regButton">
            Change Password
          </button>
        </form>
        <br />
        <form onSubmit={this.handleBusinessChange}>
          <label className="address">
            Change Business Details:
            <input
              value={businessName}
              onChange={this.handleChange}
              type="text"
              name="businessName"
              placeholder="Business Name"
              required
              className="baddInput"
            />
          </label>
          <input
            value={email}
            onChange={this.handleChange}
            type="text"
            name="email"
            placeholder="Business Email"
            required
            className="bcityInput"
          />
          <input
            value={address}
            onChange={this.handleChange}
            type="text"
            name="address"
            placeholder="Address"
            required
            className="bcitybInput"
          />
          <input
            value={townCity}
            onChange={this.handleChange}
            type="text"
            name="townCity"
            placeholder="Town/City"
            required
            className="bcitycInput"
          />
          <input
            value={postCode}
            onChange={this.handleChange}
            type="text"
            name="postCode"
            placeholder="Postcode"
            required
            className="btypeInput"
          />
          <textarea
            value={description}
            onChange={this.handleChange}
            type="text"
            row="10"
            column="4"
            name="description"
            placeholder="Description"
            required
            className="busInput"
          />
          <button type="submit" className="details-regButton">
            Update Business
          </button>
        </form>
      </div>
    );
  }
}
