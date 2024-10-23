import './style.css';
import icons from "../../assets/icons";

import { useNavigate } from 'react-router-dom';


function Header(props){
    const navigate = useNavigate();

    return <>
        <div id="header">
            <div id="system">
                <img src={icons.bisu} alt="" />
                <p>HRMS <span>{props.routePath}</span></p>
            </div>
            <div id="user" onClick={()=>{navigate('/profile')}}>
                <img src="https://img.icons8.com/ios-filled/50/user-male-circle.png" alt="" />
                <p>Harey Aparece</p>

            </div>
        </div>
    </>
}


export default Header;