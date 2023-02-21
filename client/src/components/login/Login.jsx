import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setUserSaved, setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  //setting the inputs
  const onChange = (e) => {
    //username     : barney
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //deconstructing the username and password variable from the inputs
  const { username, password } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //making a body object from the values of username and password
      const body = { username, password };

      //fetch api for POST method
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        return alert("Username or Password Invalid");
      }
      const parseRes = await response.json();

      if (parseRes.token) {
        //localstorage
        localStorage.setItem("token", parseRes.token);
        setUserSaved(parseRes.uuid);
        setAuth(true);
      } else {
        setAuth(false);
        console.log("Something wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="contact-wrapper">
      <div className="left_side">
        <img src="https://cdn.freelogodesign.org/files/623e8dd867994dc9b867baf86d7a19ca/thumb/logo_200x200.png?v=637946704740000000" />
      </div>
      <div className="right_side">
        <h2>Account Login</h2>

        <form onSubmit={onSubmitForm}>
          <div className="form-row">
            <input
              type="text"
              id="username"
              required
              name="username"
              onChange={(e) => onChange(e)}
            />
            <span>Username</span>
          </div>
          <div className="form-row">
            <input
              type="password"
              id="password"
              required
              name="password"
              onChange={(e) => onChange(e)}
            />
            <span>Password</span>
          </div>
          <div className="form-row">
            <button className="login">Login</button>
          </div>
          <div className="form-row">
            <Link to="/register">
              <button className="signup">Sign Up</button>
            </Link>
          </div>
        </form>
        {/* <div className="socials-wrapper">
              <h2>Login with your Social Account</h2>
              <ul>
                  <li><a href="https://www.facebook.com" className="facebook">
                    <i className="fab fa-facebook-square"></i></a></li>
                  <li><a href="https://twitter.com/?lang=en" className="twitter">
                    <i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://www.instagram.com/?hl=en" className="instagram">
                    <i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://www.youtube.com/" className="youtube">
                    <i className="fab fa-youtube"></i></a></li>
                </ul>
            </div> */}
      </div>
    </div>
  );
};
export default Login;