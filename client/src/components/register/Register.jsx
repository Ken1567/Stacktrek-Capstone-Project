import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ setAuth }) => {
  const [input, setInputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    birthdate: "",
    emailAdd: "",
  });

  const onChange = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
  };
  const { firstname, lastname, username, password, birthdate, emailAdd } =
    input;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        username,
        password,
        birthdate,
        emailAdd,
      };

      const response = await fetch("https://capstone-project-server-side.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        //localstorage
        localStorage.setItem("token", parseRes.token);
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
    <>
      <div className="form-row">
        <h2 className="header">Register</h2>

        <form onSubmit={onSubmitForm}>
          <div className="form-row">
            <input
              id="firstname"
              type="text"
              required
              name="firstname"
              value={firstname}
              onChange={(e) => onChange(e)}
            />
            <span>First Name</span>
          </div>
          <div className="form-row">
            <input
              id="lastname"
              type="text"
              required
              name="lastname"
              value={lastname}
              onChange={(e) => onChange(e)}
            />
            <span>Last Name</span>
          </div>
          <div className="form-row">
            <input
              type="text"
              required
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
            />
            <span>Username</span>
          </div>
          <div className="form-row">
            <input
              type="password"
              required
              input
              maxLength={16}
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <span>Password</span>
          </div>
          <div className="form-row">
            <input
              type="date"
              required
              name="birthdate"
              value={birthdate}
              onChange={(e) => onChange(e)}
            />
            <span>Date of Birth</span>
          </div>
          <div className="form-row">
            <input
              type="text"
              required
              name="emailAdd"
              value={emailAdd}
              onChange={(e) => onChange(e)}
            />
            <span>Email Address</span>
          </div>
          <div className="form-row"></div>
          <div className="form-row">
            <button className="signup">Submit</button>
          </div>
        </form>
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
      </div>
    </>
  );
};
export default Signup;