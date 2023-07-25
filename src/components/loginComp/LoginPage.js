import React, { useState } from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../loadingBtnComp/LoadingBtn"
import { AUTH_LOGIN, AUTH_REGISTER } from "../../store/constants";

const LoginPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const authLoginBtnLoading = useSelector(state=>state.button.authLoginBtnLoading)
  const authRegisterBtnLoading = useSelector(state=>state.button.authRegisterBtnLoading)
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rusername, setRusername] = useState("");
  const [rpassword, setRpassword] = useState("");

  // registration 

  const handleRegistration = async () => {
    dispatch({type:AUTH_REGISTER, payload:true})
    if (rusername.length && rpassword.length) {
      if(rusername.length<5 || rpassword.length <8){
        alert("Username must be greater that 4 characters and password must be atleast 8 charachters")
        dispatch({type:AUTH_REGISTER, payload:false})
        return;

      }
      const data = { username: rusername, password: rpassword };
      const response = await fetch(
        `${process.env.REACT_APP_CLIENT_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      const res = await response.json();
      
      if (res.success) {
        history("/main");
      } else {
        alert(
          "username already exists"
        );
      }
    } else {
      alert(
        "Re-enter credentials, username must be atleast 5 characters and password must be greater than 7 caharacters"
      );
    }
    dispatch({type:AUTH_REGISTER, payload:false})
  };

  const handleLogin = async () => {
    dispatch({type:AUTH_LOGIN, payload:true})
    if (username.length && password.length) {
      const data = { username: username, password: password };
      const response = await fetch(
        `${process.env.REACT_APP_CLIENT_URL}/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      const res = await response.json();
      if (res.success) {
        history("/main");
      } else {
        alert(res.message);
      }
    } else {
      alert("Re-enter credentials");
    }
    dispatch({type:AUTH_LOGIN,payload:false})
  };

  return (
    <div className="decorate">
      <div className="d-flex justify-content-center align-items-center ">
        <div className="loginbox d-flex align-items-center justify-content-center">
          {login ? (
            <div className="login-outline d-inline-block ">
              <div className="light-point"></div>

              <div className="credentials_h">
                <div className="username-i-h mb-3">
                  <input
                    type="text"
                    placeholder="username"
                    className="username-i"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="username-i-h mb-3">
                  <input
                    type="text"
                    placeholder="password"
                    className="username-i"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="line mb-3"></div>
              <div className="login-btn-h d-flex justify-content-center ">
                <button
                  className="login-btn d-inline-block w-100"
                  onClick={handleLogin}
                >
                  <LoadingBtn btnText={"Login"} isLoading={authLoginBtnLoading}/>
                </button>
              </div>
              <div className="no-account-h my-3 pt-3">
                <p className="no-account-text d-inline-block w-50 text-center">
                  No account?
                </p>
                <button
                  className="d-inline-block w-25 nc-signup-btn"
                  onClick={() => {
                    setLogin(false);
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
          ) : (
            // ======== registration ====
            <div className="login-outline d-inline-block ">
              <div className="light-point"></div>

              <div className="credentials_h">
                <div className="username-i-h mb-3">
                  <input
                    type="text"
                    placeholder="create username"
                    className="username-i"
                    onChange={(e) => {
                      setRusername(e.target.value);
                    }}
                  />
                </div>
                <div className="username-i-h mb-3">
                  <input
                    type="text"
                    placeholder="create password"
                    className="username-i"
                    onChange={(e) => {
                      setRpassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="line mb-3"></div>
              <div className="login-btn-h d-flex justify-content-center ">
                <button
                  className="login-btn d-inline-block w-100"
                  onClick={handleRegistration}
                >
<LoadingBtn btnText={"Create account"} isLoading={authRegisterBtnLoading}/>
                  
                </button>
              </div>
              <div className="no-account-h my-3 pt-3">
                <p className="no-account-text d-inline-block w-50 text-center">
                  Have an account?
                </p>
                <button
                  className="d-inline-block w-25 nc-signup-btn"
                  onClick={() => {
                    setLogin(true);
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
