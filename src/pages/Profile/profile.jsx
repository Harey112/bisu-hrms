import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';

function Profile() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {name: 'Back', route: -1, icon: icons.back, isSelected: false},
        {name: 'Personal Information', route: '/profile/personal-info', icon: icons.personalinfo, isSelected: true},
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: false},
    ];




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="dashboard_container" className='content_container'>
                    <div className="widget" id='widget1'>
                        <button onClick={logout}> Logout</button>
                    </div>
                    <div className="widget" id='widget2'></div>
                    <div className="widget" id='widget3'></div>
                    <div className="widget" id='widget4'></div>
                    <div className="widget" id='widget5'></div>
                    <div className="widget" id='widget6'></div>
                    <div className="widget" id='widget7'></div>
                    <div className="widget" id='widget8'></div>
                    <div className="widget" id='widget9'></div>
                    <div className="widget" id='widget10'></div>
                </div>
            </Layout>
        </>
    );
}

export default Profile;
