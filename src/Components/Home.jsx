import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import "./Home.css";

const Home = ({ getUser }) => {
  return (
    <div className="HomepageContainer">
      <div className="LogoContainer"></div>
      <div className="HomepageFormContainer">
        <LogIn getUser={getUser} />
        <SignUp />
      </div>
    </div>
  );
};

export default Home;
