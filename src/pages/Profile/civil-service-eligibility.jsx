import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormSelect from '../../fragments/form/select';
import FormTextField from '../../fragments/form/textfield';

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


    const csElegibility = <>
    <form action="" className='add_form'>
        <FormTextField type="text" label="Professional Certifications" name="profissionalcert" width="300px"/>
        <FormTextField type="text" label="Rating (if applicable)" name="rating" width="300px"/>
        <FormTextField type="date" label="Date of Examination/Conferment" name="dateofexam" width="300px"/>
        <FormTextField type="text" label="Place of Examination/Conferment" name="venueofexam" width="300px"/>
        <FormTextField type="text" label="License Number (if applicable)" name="licenseno" width="300px"/>
        <FormTextField type="date" label="License Validity " name="licensevalidity" width="300px"/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    </>;




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
            <div className="cs_elegibilty content_container">
                    <div className='page_title'>
                        <img src={icons.civilserviceeligibility} alt="Photo" />
                        <p>Civil Service Eligibility</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Action</th>
                                        <th rowSpan="2">Career Service/RA 1080 (Board/ Bar) Under Special Laws/CES/CSEE/Barangay Eligibility/Driver's License </th>
                                        <th rowSpan="2">Rating</th>
                                        <th rowSpan="2">Date of Examination/Conferment</th>
                                        <th rowSpan="2">Place of Examination/Conferment</th>
                                        <th colSpan="2">License</th>

                                    </tr>
                                    <tr>
                                    <th style={{width: "10%"}}>Number</th>
                                    <th style={{width: "10%"}}>Date of Validity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>No Records Yet.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Civil Service Elegibilty', children: csElegibility})}}>Add Record</button>
                                <button className='positive_button'>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default CivilServiceEligibility;
