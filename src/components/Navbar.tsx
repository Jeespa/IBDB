import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Search from "./Search";
import "./Navbar.css";
import { auth } from '../firebase-config';
import '../index.css'
import { Button } from '@mui/material';
import DarkMode from './DarkMode';

function Navbar() {

  const [profilLink, setProfileLink] = useState('/login');
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setProfileLink('/profile');
    } else {
      setProfileLink('/login');
    }
  });

  return (
    <div className='navbar-container'>
      <nav>
        <Link to="/"><img src={"/ibdb.png"} style={{marginTop: 15}}/></Link>
        <div id="search"><Search /></div>
        <DarkMode/>
        <Link to={profilLink}><img src={"/account.png"}/></Link>
      </nav>
    </div>
  );
}

export default Navbar;