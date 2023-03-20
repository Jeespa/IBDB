import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import isAdmin from '../utils/admin'
import Logout from "../components/Logout";
import './ProfilePage.css'

function ProfilePage() {
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const onAddBookClick = () => {
    navigate("/add-book");
  }

  const onAddAuthorClick = () => {
    navigate("/add-author");
  }

  useEffect(() => {
    isAdmin().then((isAdmin) => {
      setAdmin(isAdmin);
    });
  }, []);

  return (
    <div>
      <h1>Bruker</h1>
      {
        admin && (
          <div className="parent-container">
            <div className="button-container">
              <button onClick={onAddAuthorClick} className="add-button">
                <span className="button-text">Legg til forfatter</span>
                <img src='./person_add.png' alt='Add author' className="button-icon" />
              </button>
              <button onClick={onAddBookClick} className="add-button">
                <span className="button-text">Legg til bok</span>
                <img src='./library_add.png' alt='Add book' className="button-icon" />
              </button>
            </div>
          </div>
        )
      }
      <Logout />
    </div>
  );

}

export default ProfilePage;