import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select';

function EducationalBackground() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Personal Information', route: '/profile', icon: icons.personalinfo, isSelected: false},
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: false},
        {name: 'Educational Background', route: '/profile/educational-background', icon: icons.educationalbackground, isSelected: true},
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: false},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];


    const addEducBackground = <>
    <form action="" className='add_form'>
        <FormSelect choices={['Elementary', 'Secondary', 'Vocational/Trade Course', 'College', 'Graduate Studies']}/>
        <FormTextField type="text" label="Name of School" name="nameofschool" width="300px"/>
        <FormTextField type="text" label="Basic Education/Degree/Course" name="degree" width="300px"/>
        <FormTextField type="date" label="Period of Attendance(FROM)" name="periodofattendencefrom" width="300px"/>
        <FormTextField type="date" label="Period of Attendance(TO)" name="periodofattendenceto" width="300px"/>
        <FormTextField type="text" label="Highest Level/Unit Earned (if not grduated)" name="highestdegree" width="300px"/>
        <FormTextField type="number" label="Year Graduated" name="yeargraduated" width="300px"/>
        <FormTextField type="text" label="Scholarship/Academic Honor Received" name="scholarshipandaward" width="300px"/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    </>;




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div className="edu_bg content_container">
                    <div className='page_title'>
                        <img src={icons.educationalbackground} alt="Photo" />
                        <p>Educational Background</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Action</th>
                                        <th rowSpan="2">Level</th>
                                        <th rowSpan="2">Name of School</th>
                                        <th rowSpan="2">Basic Education/Degree/Course</th>
                                        <th colSpan="2">Period of Attendance</th>

                                        <th rowSpan="2">Highest Level/Unit Earned</th>
                                        <th rowSpan="2">Year Graduated</th>
                                        <th rowSpan="2">Scholarship/Academic Honor Received</th>
                                    </tr>
                                    <tr>
                                    <th style={{width: "10%"}}>From</th>
                                    <th style={{width: "10%"}}>To</th>
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
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Educational Background', children: addEducBackground})}}>Add Record</button>
                                <button className='positive_button'>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default EducationalBackground;
