import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';

function CivilServiceEligibility() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Personal Information', route: '/profile', icon: icons.personalinfo, isSelected: false},
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: false},
        {name: 'Educational Background', route: '/profile/educational-background', icon: icons.educationalbackground, isSelected: false},
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: true},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <p>Civil Service Eligibility</p>
            </Layout>
        </>
    );
}

export default CivilServiceEligibility;
