import React from 'react';
import {Link} from 'react-router-dom';
import Search from "./Search";
import "./Navbar.css";

function Navbar() {
  return (
    <div className='navbar-container'>
      <nav>
        <Link to="/"><img src={"/ibdb.png"} style={{marginTop: 15}}/></Link>
        <div id="search"><Search /></div>
        <Link to="/addbook"><img src={"/addbook.png"}/></Link>
        <Link to="/login"><img src={"/account.png"}/></Link>
      </nav>
    </div>
  );
}

export default Navbar;