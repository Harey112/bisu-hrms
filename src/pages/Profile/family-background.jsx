import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";
import { logout } from '../../../util functions/account';
import FormTextField from '../../fragments/form/textfield';

function FamilyBackground() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Personal Information', route: '/profile', icon: icons.personalinfo, isSelected: false},
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: true},
        {name: 'Educational Background', route: '/profile/educational-background', icon: icons.educationalbackground, isSelected: false},
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: false},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: false},
    ];

    const addChild = <>
    <form className='add_child_form' action="" method="post">
        <FormTextField type="text" label="Fullname" name="fullname" width="300px"/>
        <FormTextField type="date" label="Date of birth" name="dateofbirth" width="300px"/>
        <div>
            <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
            <button className='positive_button'>Add</button>
        </div>
    </form>
    
    </>




    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div className="family_bg_container content_container">
                    <div className='page_title'>
                        <img src={icons.familybackground} alt="Photo" />
                        <p>Family Background</p>
                    </div>
                    <div className="group_form">
                        <h5>Spouse's Name</h5>
                        <div className='section'>
                            <FormTextField type="text" label="Firstname" name="spuosefirstname" width="24%"/>
                            <FormTextField type="text" label="Middlename" name="spuosemiddlename" width="24%"/>
                            <FormTextField type="text" label="Surname" name="spuosesurname" width="24%"/>
                            <FormTextField type="text" label="Extension" name="spuoseextension" width="24%"/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Occupation" name="spuoseoccupation" width="24%"/>
                            <FormTextField type="text" label="Employer/Business Name" name="spousebusinee" width="24%"/>
                            <FormTextField type="text" label="Business Address" name="spuosebusinessadd" width="24%"/>
                            <FormTextField type="text" label="Telephone No." name="spousetelno" width="24%"/>
                        </div>
                    </div>

                    <div className="group_form">
                        <h5>Father's Name</h5>
                        <div className='section'>
                            <FormTextField type="text" label="Firstname" name="spuosefirstname" width="24%"/>
                            <FormTextField type="text" label="Middlename" name="spuosemiddlename" width="24%"/>
                            <FormTextField type="text" label="Surname" name="spuosesurname" width="24%"/>
                            <FormTextField type="text" label="Extension" name="spuoseextension" width="24%"/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Occupation" name="spuoseoccupation" width="24%"/>
                            <FormTextField type="text" label="Employer/Business Name" name="spousebusinee" width="24%"/>
                            <FormTextField type="text" label="Business Address" name="spuosebusinessadd" width="24%"/>
                            <FormTextField type="text" label="Telephone No." name="spousetelno" width="24%"/>
                        </div>
                    </div>

                    <div className="group_form">
                        <h5>Mother's Maiden Name</h5>
                        <div className='section'>
                            <FormTextField type="text" label="Firstname" name="spuosefirstname" width="24%"/>
                            <FormTextField type="text" label="Middlename" name="spuosemiddlename" width="24%"/>
                            <FormTextField type="text" label="Surname" name="spuosesurname" width="24%"/>
                            <FormTextField type="text" label="Extension" name="spuoseextension" width="24%"/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Occupation" name="spuoseoccupation" width="24%"/>
                            <FormTextField type="text" label="Employer/Business Name" name="spousebusinee" width="24%"/>
                            <FormTextField type="text" label="Business Address" name="spuosebusinessadd" width="24%"/>
                            <FormTextField type="text" label="Telephone No." name="spousetelno" width="24%"/>
                        </div>
                    </div>

                    <div className="group_form">
                        <h5>Children</h5>
                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Name of Children</th>
                                    <th>Date of birth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No Child Yet.</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="profile_tool">
                            <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Child', children: addChild})}}>Add Child</button>
                            <button className='positive_button'>Save</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default FamilyBackground;
