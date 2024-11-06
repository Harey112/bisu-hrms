import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function Profile() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    const [userdata, setUserData] = useState({...data})
    const {user, userLoading, saveNewData} = useUser()
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

  

        if(userLoading){
            setOperation({title: 'Status', message: 'Fetching data...'});
            
        }else{
            setUserData({...user});
            
            setOperation(null)
        }

    }, [userLoading]);






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
        setOperation({title: "Status", message: 'Saving...'});
        var output = await saveNewData(userdata);
        setOperation(null);
        if(output.success){
            setMessage({title: "Saved", message: output.message, button:{label: "Okay", action: ()=>{setMessage(null)}}});
        }else{
            setError({title: "Save failed!", message: output.message, button:{label: "Okay", action: ()=>{setMessage(null)}}});
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
                                <FormTextField type="text" label="Firstname" value={userdata.personalinfo.firstname} width="48%" onChange={(e) => handleChange(e, "personalinfo.firstname")}/>
                                <FormTextField type="text" label="Middlename" value={userdata.personalinfo.middlename} width="48%" onChange={(e) => handleChange(e, "personalinfo.middlename")}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="text" label="Lastname" value={userdata.personalinfo.lastname} width="48%" onChange={(e) => handleChange(e, "personalinfo.lastname")}/>
                                <FormTextField type="text" label="Name Extension" value={userdata.personalinfo.nameextension} width="48%" onChange={(e) => handleChange(e, "personalinfo.nameextension")}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="date" label="Birth Date" value={userdata.personalinfo.birthdate} width="28%" onChange={(e) => handleChange(e, "personalinfo.birthdate")}/>
                                <FormTextField type="text" label="Birth Place" value={userdata.personalinfo.birthplace} width="68%" onChange={(e) => handleChange(e, "personalinfo.birthplace")}/>
                            </div>
                            <div className="section">
                                <FormSelect choices={['Male', 'Female']} value={userdata.personalinfo.sex} label="Sex" width="48%" onChange={(e) => handleChange(e, "personalinfo.sex")}/>
                                <FormSelect choices={['Single', 'Married', 'Divorced', 'Widowed', 'Separated']} value={userdata.personalinfo.civilstatus} label="Civil Status" width="48%" onChange={(e) => handleChange(e, "personalinfo.civilstatus")}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="Height (m)" value={userdata.personalinfo.height} width="32%" onChange={(e) => handleChange(e, "personalinfo.height")}/>
                                <FormTextField type="number" label="Weight (kg)" value={userdata.personalinfo.weight} width="32%" onChange={(e) => handleChange(e, "personalinfo.weight")}/>
                                <FormTextField type="text" label="Blood Type" value={userdata.personalinfo.bloodtype} width="32%" onChange={(e) => handleChange(e, "personalinfo.bloodtype")}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="GSIS ID NO." value={userdata.personalinfo.gsisno} width="32%" onChange={(e) => handleChange(e, "personalinfo.gsisno")}/>
                                <FormTextField type="number" label="PAG-IBIG NO." value={userdata.personalinfo.pagibigno} width="32%" onChange={(e) => handleChange(e, "personalinfo.pagibigno")}/>
                                <FormTextField type="number" label="PHILHEALTH NO." value={userdata.personalinfo.philhealthno} width="32%" onChange={(e) => handleChange(e, "personalinfo.philhealthno")}/>
                            </div>
                            <div className='section'>
                                <FormTextField type="number" label="SSS NO." value={userdata.personalinfo.sssno} width="32%" onChange={(e) => handleChange(e, "personalinfo.sssno")}/>
                                <FormTextField type="number" label="TIN NO." value={userdata.personalinfo.tinno} width="32%" onChange={(e) => handleChange(e, "personalinfo.tinno")}/>
                                <FormTextField type="text" label="AGENCY EMPLOYEE NO." value={userdata.personalinfo.agencyemployeeno} width="32%" onChange={(e) => handleChange(e, "personalinfo.agencyemployeeno")}/>
                            </div>
                        </div>
                        <div className="profile_pic">
                            
                        </div>
                    </div>
                    <div className="group_form">
                        <h5>Residential Address</h5>
                        <div className='section'>
                            <FormTextField type="text" label="House/Block/Lot No." value={userdata.personalinfo.residentialaddress.house} width="32%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.house")}/>
                            <FormTextField type="text" label="Street" value={userdata.personalinfo.residentialaddress.street} width="32%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.street")}/>
                            <FormTextField type="text" label="Subdivision/Village" value={userdata.personalinfo.residentialaddress.subdivision} width="32%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.subdivision")}/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Barangay" value={userdata.personalinfo.residentialaddress.barangay} width="24%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.barangay")}/>
                            <FormTextField type="text" label="City" value={userdata.personalinfo.residentialaddress.city} width="24%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.city")}/>
                            <FormTextField type="text" label="Province" value={userdata.personalinfo.residentialaddress.province} width="24%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.province")}/>
                            <FormTextField type="number" label="Zipcode" value={userdata.personalinfo.residentialaddress.zipcode} width="24%" onChange={(e) => handleChange(e, "personalinfo.residentialaddress.zipcode")}/>
                        </div>
                    </div>
                    <div className="group_form">
                        <h5>Permanent Address</h5>
                        <div className='section'>
                            <FormTextField type="text" label="House/Block/Lot No." value={userdata.personalinfo.permanentaddress.house} width="32%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.house")}/>
                            <FormTextField type="text" label="Street" value={userdata.personalinfo.permanentaddress.street} width="32%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.street")}/>
                            <FormTextField type="text" label="Subdivision/Village" value={userdata.personalinfo.permanentaddress.subdivision} width="32%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.subdivision")}/>
                        </div>
                        <div className='section'>
                            <FormTextField type="text" label="Barangay" value={userdata.personalinfo.permanentaddress.barangay} width="24%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.barangay")}/>
                            <FormTextField type="text" label="City" value={userdata.personalinfo.permanentaddress.city} width="24%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.city")}/>
                            <FormTextField type="text" label="Province" value={userdata.personalinfo.permanentaddress.province} width="24%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.province")}/>
                            <FormTextField type="number" label="Zipcode" value={userdata.personalinfo.permanentaddress.zipcode} width="24%" onChange={(e) => handleChange(e, "personalinfo.permanentaddress.zipcode")}/>
                        </div>
                    </div>
                    <div className="group_form">
                        <div className='section'>
                            <FormTextField type="text" label="Telephone No." value={userdata.personalinfo.telno} width="32%" onChange={(e) => handleChange(e, "personalinfo.telno")}/>
                            <FormTextField type="text" label="Mobile No." value={userdata.personalinfo.mobileno} width="32%" onChange={(e) => handleChange(e, "personalinfo.mobileno")}/>
                            <FormTextField type="text" label="Email" value={userdata.personalinfo.email} onChange={(e) => handleChange(e, "personalinfo.email")} width="32%" disable={true}/>
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
