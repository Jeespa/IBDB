import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import Logout from "../components/Logout";
import AddBook from "../components/AddBook";
import { auth, db } from "../firebase-config";
import ReadBooks from "../components/ReadBooks";
import { Book } from '../schemas/Book';



function ProfilePage() {

  const [userId, setUserId] = useState('0');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userBooks, setUserBooks] = useState<string[]>([]);


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
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
      console.log(userId)
      //const userBooks = userSnap.get("readBooks");
      //setUserBooks(userBooks);
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
      {userId && <ReadBooks userId={'zVFNJVNEMHqW2kKLdGZQ'} />}
    </div>
  )
}

export default ProfilePage;