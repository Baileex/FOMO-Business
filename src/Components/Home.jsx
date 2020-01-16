import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./Home.css";
import logo from "../assets/fomo-logo.png";

const Home = ({ getUser }) => {
  return (
    <div className="HomepageContainer">
      <div className="LogoContainer"><img src={logo}></img></div>
      <div className="HomepageFormContainer">
        <LogIn getUser={getUser} />
        <SignUp />
      </div>
    </div>
  );
};

export default Home;
