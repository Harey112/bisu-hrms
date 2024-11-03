import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';

function LearningDevelopmentProgramAttended() {
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
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: false},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: true},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];


    const addProgram = <>
    <form action="" className='add_form'>
        <FormTextField type="text" label="Title of Program" name="title" width="300px"/>
        <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px"/>
        <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px"/>
        <FormTextField type="text" label="Number of Hours" name="nohours" width="300px"/>
        <FormTextField type="text" label="Type of LD (Managerial/Technical/etc)" name="type" width="300px"/>
        <FormTextField type="text" label="Conducted/Sponsored By" name="sponsor" width="300px"/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    </>




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
            <div className="ldpa content_container">
                    <div className='page_title'>
                        <img src={icons.learningdevelopmentprogramattended} alt="Photo" />
                        <p>Learning Development Program Attended</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Action</th>
                                        <th rowSpan="2">Title of Learning and Development Intervintions/Trainings Program</th>
                                        <th colSpan="2">Inclusive Dates</th>
                                        <th rowSpan="2">Number of Hours</th>
                                        <th rowSpan="2">Type of LD</th>
                                        <th rowSpan="2">Conducted/Sponsored By</th>
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
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Learning Development Program', children: addProgram})}}>Add Record</button>
                                <button className='positive_button'>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default LearningDevelopmentProgramAttended;
