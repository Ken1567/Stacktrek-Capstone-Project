import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Newsfeed from "./components/newsfeed/Newsfeed";
import userContext from "./context/userContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSaved, setUserSaved] = useState();
  const userState = {
    uuid: userSaved,
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    fetch(`https://capstone-project-server-side.herokuapp.com/userinfo`, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserSaved(res.uuid);
        setAuth(true);
        console.log(res);
      });
  }, []);
  //authenticated ? renderApp() : renderLogin();
  return (
    //router to redirect and check authentication
    <div className="App">
      <userContext.Provider value={userState}>
        <Router>
          <div className="app-container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                exact
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login setUserSaved={setUserSaved} setAuth={setAuth} />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/register"
                element={
                  !isAuthenticated ? (
                    <Register setAuth={setAuth} />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <Dashboard setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              ></Route>
              <Route exact path="/newsfeed" element={<Newsfeed />}></Route>
            </Routes>
          </div>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;