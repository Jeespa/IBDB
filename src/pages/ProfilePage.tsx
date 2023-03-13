import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../components/Logout";
import { auth, db } from "../firebase-config";

function ProfilePage() {

  const [userId, setUserId] = useState('0');
  const [isAdmin, setIsAdmin] = useState(false);

  async function CheckIfAdmin(userId: string) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return (
      docSnap.get("admin")
    );
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUserId(user.uid);
      setIsAdmin(await CheckIfAdmin(userId));
    }
  });


  const navigate = useNavigate();

  const onAddBookClick = () => {
    navigate("/add-book");
  }

  const onAddAuthorClick = () => {
    navigate("/add-author");
  }

  function showAddOptions() {
    if (isAdmin) {
      return (
        <div>
          <div onClick={onAddBookClick} style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Legg til bok</div>
          <div onClick={onAddAuthorClick} style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>Legg til forfatter</div>
        </div>
      )
    }
  }

  return (
    <div>
      <h1>Bruker</h1>
      {showAddOptions()}
      <Logout />
    </div>
  )
}

export default ProfilePage;