import React from "react";
import "./homepage.css";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isGuest, setIsGuest } = useContext(userContext);
  const history = useNavigate();
  return (
    <div>
      <div className="btns-h">
        <button
          className="guest-btn"
          onClick={() => {
            setIsGuest(true);
            history("/main");
          }}
        >
          Use as guest
        </button>
        <button className="home-login-btn" onClick={()=>{setIsGuest(false)
          history('/auth')}}>Login</button>
      </div>
    </div>
  );
};

export default Home;
