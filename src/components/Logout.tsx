import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Logout() {

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signOut(auth);
        alert("Logged out");
    };

    return (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
    )
}

export default Logout;

