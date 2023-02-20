import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import {Link} from 'react-router-dom';
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
    <div>
      <nav>
        <Link to="/">
            <img 
                style={{ marginTop: 20 }} 
                src={"/ibdb.png"}
            />
        </Link>
        {/* <Link to="/addbook">Add book</Link> */}
        <Link to={profilLink}>
          <img id="profil" src="https://s3-alpha-sig.figma.com/img/0bdd/7c7a/3913e1215c032e161941a57eddcf6411?Expires=1677456000&Signature=ftYdvHFrcJ-aLnubNEmO8X0hkGuidPCwyV6W5sIXfYPa3KPnUo-T11OQEM--RE6bb3-6swxfVk-OluJtrC6Jo-rSkhoJlfAX~pDvxhdUOamOB8BfSmajnQet0EzZWNABYk9AwCy~jK7zAOHw5aIZt3W1O8GW3G~glkLxoet2WKFXUJJN74sGBkIQl4W6lJdSEUHe5aL9~H5AEEDw4aHq2WSMjuaX8sd-UbOdyof4O9cdPzKt-4P0JMnyt1vvzAosH64~3K~Ocfqte9w1vrpbNwo0i5P-0JWPka8tehV912UA3QOjp-V04LkiJVHuVBDvoeBIGnJVOcuTXqhL-DW9Qw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
         alt="Profil"></img></Link>
      </nav>
    </div>
  );
}

export default Navbar;