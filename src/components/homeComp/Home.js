import React from "react";
import "./homepage.css";


import { useNavigate } from "react-router-dom";
import LoadingBtn from "../loadingBtnComp/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { GUEST, LOGIN } from "../../store/constants";

const Home = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const guestBtnLoading = useSelector(state=>state.button.guestBtnLoading)
  const loginLoading = useSelector(state=>state.button.loginBtnLoading)
  return (
    <div>
      <div className="btns-h">
        <button
          className="guest-btn"
          onClick={async () => {
            dispatch({ type: GUEST , payload:true});

            await fetch(`${process.env.REACT_APP_CLIENT_URL}/guest`, {
              credentials: "include",
            });
            history("/main");
            dispatch({ type: GUEST , payload: false});
          }}
        >
          <LoadingBtn btnText={"Use as guest"} isLoading={guestBtnLoading} />
        </button>
        <button
          className="home-login-btn"
          onClick={() => {
            dispatch({type: LOGIN, payload:true})
            history("/auth")
            dispatch({type: LOGIN, payload:false})
          }}
        >
          <LoadingBtn btnText={"Login"} isLoading={loginLoading}/>
        </button>
      </div>
    </div>
  );
};

export default Home;
