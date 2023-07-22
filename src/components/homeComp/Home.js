import React from "react";
import "./homepage.css";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
 
  const history = useNavigate();
  return (
    <div>
      <div className="btns-h">
        <button
          className="guest-btn"
          onClick={ async () => {
            await fetch(`${process.env.REACT_APP_CLIENT_URL}/guest`,{   credentials: 'include'})
            history("/main");
          }}
        >
          Use as guest
        </button>
        <button className="home-login-btn" onClick={()=>{
          history('/auth')}}>Login</button>
      </div>
    </div>
  );
};

export default Home;
