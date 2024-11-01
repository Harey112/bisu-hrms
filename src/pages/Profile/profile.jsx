import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/radio';

function Profile() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Personal Information', route: '/profile', icon: icons.personalinfo, isSelected: true},
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: false},
        {name: 'Educational Background', route: '/profile/educational-background', icon: icons.educationalbackground, isSelected: false},
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: false},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div className="profile_div">
                    <div className='page_title'>
                        <img src={icons.personalinfo} alt="Photo" />
                        <p>Personal Information</p>
                    </div>
                    <div className="profile">
                        <div className="info">
                            <div className='section'>
                                <FormTextField type="text" label="Firstname" name="firstname" width="48%"/>
                                <FormTextField type="text" label="Middlename" name="middlename" width="48%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="text" label="Lastname" name="lastname" width="48%"/>
                                <FormTextField type="text" label="Name Extension" name="nameextension" width="48%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="date" label="Birth Date" name="birthdate" width="28%"/>
                                <FormTextField type="text" label="Birth Place" name="birthplace" width="68%"/>
                            </div>

                            <div className="section">
                                <FormSelect choices={['Male', 'Female']} name="sex" label="Sex" width="48%"/>
                                <FormSelect choices ={['Single', 'Married', 'Divorced', 'Widowed', 'Separated']} name="civilstatus" label="Civil Status" width="48%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="Height (m)" name="height" width="32%"/>
                                <FormTextField type="number" label="Weight (kg)" name="weight" width="32%"/>
                                <FormTextField type="text" label="Blood Type" name="bloodtype" width="32%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="Height (m)" name="height" width="32%"/>
                                <FormTextField type="number" label="Weight (kg)" name="weight" width="32%"/>
                                <FormTextField type="text" label="Blood Type" name="bloodtype" width="32%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="GSIS ID NO." name="gsisno" width="32%"/>
                                <FormTextField type="number" label="PAG-IBIG NO." name="pagibigno" width="32%"/>
                                <FormTextField type="number" label="PHILHEALTH NO." name="philhealthno" width="32%"/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="SSS NO." name="sssno" width="32%"/>
                                <FormTextField type="number" label="TIN NO." name="tinno" width="32%"/>
                                <FormTextField type="text" label="AGENCY EMPLOYEE NO." name="agencyemployeeno" width="32%"/>
                            </div>
                        </div>
                        <div className="profile_pic"></div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Profile;
