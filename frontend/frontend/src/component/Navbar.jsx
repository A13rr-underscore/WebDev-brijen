// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import Register from "../pages/Register";
const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/contact">Contact</Link>
        <Link to="/">Home</Link>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
        
      </nav>
    </div>
  );
};

export default Navbar;
