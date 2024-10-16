import './style.css';
import base64Icons from "../../assets/icons";


function Header(props){
    return <>
        <div id="header">
            <div id="system">
                <img src={base64Icons.bisu} alt="" />
                <p>HRMS <span>{props.routePath}</span></p>
            </div>
            <div id="user">
                <img src="https://img.icons8.com/ios-filled/50/user-male-circle.png" alt="" />
                <p>Harey Aparece</p>

            </div>
        </div>
    </>
}


export default Header;