import React, { useState } from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const history = useNavigate();
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rusername, setRusername] = useState("");
  const [rpassword, setRpassword] = useState("");
  const handleRegistration = async () => {
    if (rusername.length && rpassword.length) {
      const data = { username: rusername, password: rpassword };
      const response = await fetch(`${process.env.REACT_APP_CLIENT_URL}/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const res = await response.json()
      if(res.success){
        history('/main')
      }
      else{
        alert("Re-enter credentials, username must be atleast 5 characters and password must be greater than 7 caharacters")
      }
    }
    else{
        alert("Re-enter credentials, username must be atleast 5 characters and password must be greater than 7 caharacters")
    }
  };


const handleLogin=async()=>{
    if (username.length && password.length) {
        const data = { username: username, password: password };
        const response = await fetch(`${process.env.REACT_APP_CLIENT_URL}/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
          credentials: 'include',
        });
        const res = await response.json()
        if(res.success){
          history('/main')
        }
        else{
          alert(res.message)
        }
      }
      else{
        alert("Re-enter credentials")
    }
}

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
                <button className="login-btn d-inline-block w-100" onClick={handleLogin}>
                  Login
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
          ) :
          
          // ======== registration ====
          (
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
                  Create account
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
