import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page">
      <h1>CodeArena</h1>
      <p>Practice coding problems and track your performance.</p>

      <div>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Home;