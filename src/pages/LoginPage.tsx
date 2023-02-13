import Login from '../components/Login';
import Logout from '../components/Logout';
import CreateUserPage from './CreateUserPage';


function LoginPage() {
    return (
        <>
        <h2>Login</h2>
        <Login />
        <Logout />
        <CreateUserPage />
        </>
    )
}

export default LoginPage;