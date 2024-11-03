import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select';

function WorkExperience() {
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
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: true},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];


    const addWorkExp = <>
    <form action="" className='add_form'>
        <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px"/>
        <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px"/>
        <FormTextField type="text" label="Postion Title" name="position" width="300px"/>
        <FormTextField type="text" label="Department/Agency/Office/Company" name="designation" width="300px"/>
        <FormTextField type="text" label="Monthly Salary" name="salary" width="300px"/>
        <FormTextField type="text" label="Salary Grade & Step/Increment" name="salarygrade" width="300px"/>
        <FormTextField type="text" label="Status of Appointment" name="statsofappointment" width="300px"/>
        <FormSelect label="Is Government Service" name="isgovservice" width="300px" choices={['Yes', 'No']}/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    </>




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
            <div className="work_exp content_container">
                    <div className='page_title'>
                        <img src={icons.workexperience} alt="Photo" />
                        <p>Work Experience</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">Action</th>
                                        <th colSpan="2">Inclusive Dates</th>
                                        <th rowSpan="2">Postion Title</th>
                                        <th rowSpan="2">Department/Agency/Office/Company</th>
                                        <th rowSpan="2">Monthly Salary</th>
                                        <th rowSpan="2">Salary Grade & Step/Increment</th>
                                        <th rowSpan="2">Status of Appointment</th>
                                        <th rowSpan="2">Gov't Service</th>

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
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Work Experience', children: addWorkExp})}}>Add Record</button>
                                <button className='positive_button'>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default WorkExperience;
