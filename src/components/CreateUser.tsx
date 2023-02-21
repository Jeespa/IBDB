import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  let readBooks: Array<String> = [];

  function clearFields() {
    setUserId("");
    setName("");
    setEmail("");
    setPassword("");
    setAdmin(false);
    readBooks = [];
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
          // setUserId(data.user.uid); Denne gjorde at bruker ble lagt til i Authentication lista i Firebase, men ikke i db.
          try {
            await addDoc(collection(db, "users", userid), {
              name,
              email,
              password,
              admin,
              readBooks,
            });
            //clear textfields after pressing OK
            clearFields();
            alert("Brukeren har blitt opprettet");
            navigate("/login");
          } catch (e) {
            console.error("Error oppstod: ", e);
          }
        })
        .catch((error) => {
          alert(error.message);
          //clear textfields after pressing OK
          clearFields();
        });
    } else {
      alert("Fyll ut alle felt!");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="name"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Navn"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Epost"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Passord"
      />
      <button type="submit">Opprett bruker</button>
    </form>
  );
}
export default CreateUser;