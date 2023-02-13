import React from "react";
import {Link} from 'react-router-dom';
import '../index.css'

function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">
            <img 
                style={{ marginTop: 20 }} 
                src={"/ibdb.png"}
            />
        </Link>
        <Link to="/addbook">Add book</Link>
        <Link to="/login">Log in</Link>
      </nav>
    </div>
  );
}

export default Navbar;