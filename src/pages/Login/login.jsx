import './style.css';
import icons from '../../assets/icons';
import Textfield from "../../fragments/input/textfield";
import { useState } from 'react';
import { login } from '../../../util functions/account';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            const response = await login(email, password);
            if (response.status) {
                window.location.href = '/dashboard';
            } else {
                setLoginError(response.message);
            }
        } catch (error) {
            setLoginError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="base_container center_child" id="login_container">
            <form onSubmit={handleLogin} className="center_child" id="login_dialog">
                <img id="login_main_logo" src={icons.bisu} alt="BISU Logo" />
                <div id="input_holder">
                    <Textfield
                        type="email"
                        name="Email"
                        varName="email"
                        id="login_email_input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder={null}
                    />
                    <Textfield
                        type="password"
                        name="Password"
                        id="login_password_input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <a href="#">Forgot Password?</a>
                <button className="positive_button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p style={{ fontSize: 'small', color: 'red' }}>{loginError}</p>
            </form>
            <h1 id="system_name">HR Management System</h1>
        </div>
    );
}

export default Login;
