import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Search from "./Search";
import "./Navbar.css";
import { auth } from '../firebase-config';
import '../index.css'

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
        <Link to="/login"><img src={"/account.png"}/></Link>
      </nav>
    </div>
  );
}

export default Navbar;