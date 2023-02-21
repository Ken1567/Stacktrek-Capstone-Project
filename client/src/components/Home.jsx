import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <navbar className="navbar">
        <ul>
          <Link to="/login">Login</Link>
          <Link to="/register">Signup</Link>
        </ul>
      </navbar>
      <img
        className="logo-home"
        src="https://cdn.freelogodesign.org/files/623e8dd867994dc9b867baf86d7a19ca/thumb/logo_200x200.png?v=637946704740000000"
      />
    </>
  );
};

export default Home;