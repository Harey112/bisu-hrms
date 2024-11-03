import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select';
import { data } from '../../../util functions/datatemp';

function Profile() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    const [userdata, setUserData] = useState({...data})
    const {user, saveNewData} = useUser()
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


    useEffect(()=>{

        const getUser = () => {
            console.log(user);
            
        };

        getUser();
    },[user])




    const handleChange = (event, path) => {
        const { value } = event.target;
        
        const keys = path.split('.');

        setUserData((prevData) => {
            // Create a copy of the previous state
            let newData = { ...prevData };
            let current = newData;

            // Navigate through the keys to find the correct location
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };


    const handleSave = async()=>{
        setOperation('Saving...');
        var output = await saveNewData(userdata);
        setOperation(null);
        if(output.success){
            setMessage({title: "Save", message: output.message});
        }else{
            setError({title: "Save failed!", message: output.message});
        }
    };




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
                                <FormTextField type="text" label="Firstname" data={userdata} path="personalinfo.firstname" width="48%" onChange={handleChange}/>
                                <FormTextField type="text" label="Middlename" data={userdata} path="personalinfo.middlename" width="48%" onChange={handleChange}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="text" label="Lastname" data={userdata} path="personalinfo.lastname" width="48%" onChange={handleChange}/>
                                <FormTextField type="text" label="Name Extension" data={userdata} path="personalinfo.nameextension" width="48%" onChange={handleChange}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="date" label="Birth Date" data={userdata} path="personalinfo.birthdate" width="28%" alue={userdata.personalinfo.birthdate} onChange={handleChange}/>
                                <FormTextField type="text" label="Birth Place" data={userdata} path="personalinfo.birthplace" width="68%" onChange={handleChange}/>
                            </div>

                            <div className="section">
                                <FormSelect choices={['Male', 'Female']} data={userdata} path="personalinfo.sex" label="Sex" width="48%" onChange={handleChange}/>
                                <FormSelect choices ={['Single', 'Married', 'Divorced', 'Widowed', 'Separated']} data={userdata} path="personalinfo.civilstatus" label="Civil Status" width="48%" onChange={handleChange}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="Height (m)" data={userdata} path="personalinfo.height" width="32%" onChange={handleChange}/>
                                <FormTextField type="number" label="Weight (kg)" data={userdata} path="personalinfo.weight" width="32%" onChange={handleChange}/>
                                <FormTextField type="text" label="Blood Type" data={userdata} path="personalinfo.bloodtype" width="32%" onChange={handleChange}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="GSIS ID NO." data={userdata} path="personalinfo.gsisno" width="32%" onChange={handleChange}/>
                                <FormTextField type="number" label="PAG-IBIG NO." data={userdata} path="personalinfo.pagibigno" width="32%" onChange={handleChange}/>
                                <FormTextField type="number" label="PHILHEALTH NO." data={userdata} path="personalinfo.philhealthno" width="32%" onChange={handleChange}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="SSS NO." data={userdata} path="personalinfo.sssno" width="32%" onChange={handleChange}/>
                                <FormTextField type="number" label="TIN NO." data={userdata} path="personalinfo.tinno" width="32%" onChange={handleChange}/>
                                <FormTextField type="text" label="AGENCY EMPLOYEE NO." data={userdata} path="personalinfo.agencyemployeeno" width="32%" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="profile_pic">
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className="group_form">
                        <h5>Residential Address</h5>
                        <div className='section'>
                            <FormTextField type="text" label="House/Block/Lot No." data={userdata} path="personalinfo.residentialaddress.house" width="32%" onChange={handleChange}/>
                            <FormTextField type="text" label="Street" data={userdata} path="personalinfo.residentialaddress.street" width="32%" onChange={handleChange}/>
                            <FormTextField type="text" label="Subdivision/Village" data={userdata} path="personalinfo.residentialaddress.subdivision" width="32%" onChange={handleChange}/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Barangay" data={userdata} path="personalinfo.residentialaddress.barangay" width="24%" onChange={handleChange}/>
                            <FormTextField type="text" label="City" data={userdata} path="personalinfo.residentialaddress.city" width="24%" onChange={handleChange}/>
                            <FormTextField type="text" label="Province" data={userdata} path="personalinfo.residentialaddress.province" width="24%" onChange={handleChange}/>
                            <FormTextField type="number" label="Zipcode" data={userdata} path="personalinfo.residentialaddress.zipcode" width="24%" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="group_form">
                        <h5>Permanent Address</h5>
                        <div className='section'>
                            <FormTextField type="text" label="House/Block/Lot No." data={userdata} path="personalinfo.permanentaddress.house" width="32%" onChange={handleChange}/>
                            <FormTextField type="text" label="Street" data={userdata} path="personalinfo.permanentaddress.street" width="32%" onChange={handleChange}/>
                            <FormTextField type="text" label="Subdivision/Village" data={userdata} path="personalinfo.permanentaddress.subdivision" width="32%" onChange={handleChange}/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Barangay" data={userdata} path="personalinfo.permanentaddress.barangay" width="24%" onChange={handleChange}/>
                            <FormTextField type="text" label="City" data={userdata} path="personalinfo.permanentaddress.city" width="24%" onChange={handleChange}/>
                            <FormTextField type="text" label="Province" data={userdata} path="personalinfo.permanentaddress.province" width="24%" onChange={handleChange}/>
                            <FormTextField type="number" label="Zipcode" data={userdata} path="personalinfo.permanentaddress.zipcode" width="24%" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="profile_tool">
                            <button className='positive_button' onClick={handleSave}>Save</button>
                        </div>
                </div>
            </Layout>
        </>
    );
}

export default Profile;
