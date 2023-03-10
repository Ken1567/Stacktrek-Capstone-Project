import React from "react";
import UploadPhoto from "../upload/Upload";
import DisplayPhoto from "../display/Display";
import { useState, useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [birthdate, setbirthDate] = useState("");
  const [emailadd, setemailAdd] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const getProfile = async () => {
    try {
      //fetch api that uses the GET method
      const response = await fetch(
        "https://capstone-project-server-side.herokuapp.com/profile",
        // "http://localhost:8000/profile",
        {
          method: "GET",
          //retrieving the token and putting it in the Auth header
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      //parsing the json back to a JS object
      const parseRes = await response.json();
      setName(parseRes.username);
      setfirstName(parseRes.firstname);
      setlastName(parseRes.lastname);
      setbirthDate(parseRes.birthdate);
      setemailAdd(parseRes.emailadd);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="profile">
          <div className="main-profile">
            <div className="user-info">
              <div className="profile-pic">
                <DisplayPhoto />
                {showPhoto && <UploadPhoto />}
              </div>
              <h3 className="card-title">{name}</h3>
            </div>
            <div className="edit-btn">
              {showPhoto ? (
                <>
                  <button onClick={() => setShowPhoto((prev) => !prev)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setShowPhoto((prev) => !prev)}>
                    Edit Photo
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="user-bio">
            <p>
              <br />
              My name is {firstname} {lastname}
              <br />
              Born on {birthdate}
              <br />
              You can contact me here: <b>{emailadd}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;