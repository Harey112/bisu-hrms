import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select';

function OtherInformation() {
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
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: true},
    ];


    const addOtherInformation = <>
        <form action="" className='add_form'>
        <FormSelect label="Title of Program" name="title" width="300px"
        choices={['Special Skills and Hobbies', 'Non-academic Distinction/Recognition', 'Membership in Association/Organization']}
        />
        <FormTextField type="text" label="Skills/Hobbies/Recognition/Association" name="datefrom" width="300px"/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    </>


    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
            <div className="other_info content_container">
                    <div className='page_title'>
                        <img src={icons.otherinformation} alt="Photo" />
                        <p>Other Information</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th className='action_cell' >Action</th>
                                        <th>Special Skills and Hobbies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>No Records Yet.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    <div className="group_form auto_overflow_x">

                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th className='action_cell' >Action</th>
                                    <th>Non-academic Distinction/Recognition</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No Records Yet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="group_form auto_overflow_x">

                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th className='action_cell' >Action</th>
                                    <th>Membership in Association/Organization</th>
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
                            <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Other Information', children: addOtherInformation})}}>Add Record</button>
                            <button className='positive_button'>Save</button>
                        </div>
            </div>
            </Layout>
        </>
    );
}

export default OtherInformation;
