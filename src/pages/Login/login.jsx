import './style.css';
import base64Icons from '../../assets/icons';
import Textfield from "../../fragments/input/textfield";


function Login(){
    return<>
    <div className="base_container center_child" id="login_container">
        <div className="center_child" id="login_dialog">
            <img id="login_main_logo" src={base64Icons.bisu} alt="" srcset="" />
            <div id="input_holder">
                <Textfield type="email" name="Email" varName="email" id="login_email_input" value={null} placeholder={null}/>
                <Textfield type="password" name="Password" id="login_email_input" value={null}/>
            </div>
            <a href="#">Forgot Password?</a>
            <button className="positive_button">Login</button>
            <p style={{fontSize: 'small'}}></p>
        </div>
        <h1 id="system_name">HR Managemagement System</h1>
    </div>
    </>
}


export default Login;