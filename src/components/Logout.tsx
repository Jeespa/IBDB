import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

function Logout() {

    const navigate = useNavigate();
    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signOut(auth).then( () => {
          alert("Logged out");
          navigate('/');
        })
    };

    return (
    <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
    </form>
    )
}

export default Logout;

