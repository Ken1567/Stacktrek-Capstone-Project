import React from "react";
import { Link } from "react-router-dom";
import Post from "../post/Post";
import Profile from "../account/Profile";

const Dashboard = ({ setAuth }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      //removing the token from localstorage
      localStorage.removeItem("token");
      setAuth(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <nav className="navbar">
        <ul>
          <img className="logo-image" src="Images/logo.png" alt="logo" />
          <Link to="/newsfeed">Newsfeed</Link>
        </ul>
      </nav>
      <Profile />
      <br />
      <br />
      {<Post />}
      <button onClick={logout} className="sign-out">
        Sign Out
      </button>
    </>
  );
};
export default Dashboard;