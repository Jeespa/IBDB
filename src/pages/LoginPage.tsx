import { Link } from 'react-router-dom';
import Login from '../components/Login';


function LoginPage() {
    return (
        <>
        <h2>Login</h2>
        <Login />
        <Link to="/createuser"><p>Har du ikke konto? Opprett en her!</p></Link></>
    )
}

export default LoginPage;