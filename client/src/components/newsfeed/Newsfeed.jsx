import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../comment/Comments";
import moment from "moment";

const Newsfeed = () => {
  const [posts, setPost] = useState([]);
  // const [polling, setPolling] = useState();
  const getnewsFeed = async () => {
    try {
      //fetch api that uses the GET method
      const response = await fetch("http://localhost:8000/newsfeed", {
        method: "GET",
        //retrieving the token and putting it in the Auth header
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      //parsing the json back to a JS object
      const parseRes = await response.json();

      setPost(
        parseRes.filter((post) => {
          return post.privacy === false;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    var polling;
    const updatePosts = async () => {
      await getnewsFeed();
      polling = setTimeout(updatePosts, 1000);
    };
    polling = setTimeout(updatePosts, 1000);

    return () => {
      clearTimeout(polling);
    };
  }, []);
  return (
    <>
      <navbar className="navbar">
        <ul>
          <img className="logo-image" src="Images/logo.png" />
          <Link to="/dashboard">Dashboard</Link>
        </ul>
      </navbar>
      <br />
      <br />
      <br />
      <div>
        {posts.map((post) => {
          return (
            <Comments
              key={post.id}
              id={post.id}
              picture={post.filename}
              username={post.username}
              message={post.message}
              time_stamp={
                (post.time_stamp = moment(post.time_stamp).format("llll"))
              }
              privacy={post.privacy}
            />
          );
        })}
      </div>
    </>
  );
};

export default Newsfeed;