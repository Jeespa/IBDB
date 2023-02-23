import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import "./Logout.css";

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
    <form className="Logout" onSubmit={handleLogout}>
        <button type="submit">Logg ut</button>
    </form>
    )
}

export default Logout;

