import React, { useRef } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import "./Login.css";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const signIn = async (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    const params = {
      uId: emailRef.current.value,
      pwd: passwordRef.current.value,
    };
    try {
      const response = await axios.post("http://localhost:8080/login", params);
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      //   <Link to "/home"></Link>
      window.location = "/home";
    } catch (e) {
      console.log(e);
      if (e.response.request.status === 401) {
        alert("Invalid password");
      } else if (e.response.request.status === 404) {
        alert("User not found");
      } else {
        alert("Internal error");
      }
    }
  };
  const register = (e) => {
    // console.log("Register");
  };
  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="username/email" type="text" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray">New to Arrow?</span>
          <span className="signupScreen__link" onClick={register}>
            {" "}
            Sign up Now .
          </span>
        </h4>
      </form>
    </div>
  );
}

export default Login;
