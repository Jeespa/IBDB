import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import Logout from "../components/Logout";
import { auth, db } from "../firebase-config";
import AddBook from "./AddBook";

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

    function showAddBooks() {
      if (isAdmin) {
        return (
          <AddBook />
        )
      }
    }

  return (
    <div>
        <h1>Bruker</h1>
        <Logout />
        {showAddBooks()}
    </div>
  )
}

export default ProfilePage;