import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function CivilServiceEligibility() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    const [userdata, setUserData] = useState({...data})
    const {user, userLoading, saveNewData} = useUser()
    
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


    useEffect(()=>{
        if(userLoading){
            setOperation({title: 'Status', message: 'Fetching data...'});
            
        }else{
            setUserData({...user});
            
            setOperation(null)
        }

    }, [userLoading]);


    const AddData = () => {
        const data = { profissionalcert: '', rating: '', dateofexam: '', venueofexam: '', licenseno: '', licensevalidity: '' };
        const [newData, setNewData] = useState({ ...data });
    
        const handleDataChange = (event) => {
            const { name, value } = event.target;
            setNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
    
        const handleAddData = (e) => {
            e.preventDefault();
            
            try {
                const updatedData = [...userdata.cselegibility, { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    cselegibility: updatedData,
                }));
                
                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
    
        return (
            <>
                <form onSubmit={(e) => {handleAddData(e)}} className='add_edit_form'>
                    <FormTextField type="text" label="Professional Certifications" name="profissionalcert" value={newData.profissionalcert} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="Rating (if applicable)" name="rating" value={newData.rating} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="date" label="Date of Examination/Conferment" name="dateofexam" value={newData.dateofexam} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="Place of Examination/Conferment" name="venueofexam" value={newData.venueofexam} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="License Number (if applicable)" name="licenseno" value={newData.licenseno} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="date" label="License Validity " name="licensevalidity" value={newData.licensevalidity} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <div>
                        <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                        <button className='positive_button'>Add</button>
                    </div>
                </form>
            </>
        );
    };



    const EditData = (props) => {
        const [data, setEditData] = useState({...props.data});

        const handleDataChange = (event) => {
            const { name, value } = event.target;
            setEditData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
        const handleEditData = (e) => {
            e.preventDefault();
            
            try {
                const newArray = [...userdata.cselegibility];
                newArray[props.index] = {...data};

                setUserData((prevData) => ({
                    ...prevData,
                    cselegibility: newArray
                }));
                
            } catch (error) {
                setError({title: "Edit Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
            }
            
            setCustomContent(null);
        };





        return (
            <>
                <form onSubmit={(e) => {handleEditData(e)}} className='add_edit_form'>
                    <FormTextField type="text" label="Professional Certifications" name="profissionalcert" value={data.profissionalcert} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="Rating (if applicable)" name="rating" value={data.rating} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="date" label="Date of Examination/Conferment" name="dateofexam" value={data.dateofexam} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="Place of Examination/Conferment" name="venueofexam" value={data.venueofexam} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="text" label="License Number (if applicable)" name="licenseno" value={data.licenseno} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <FormTextField type="date" label="License Validity " name="licensevalidity" value={data.licensevalidity} width="300px" onChange={(e)=>{handleDataChange(e)}}/>
                    <div>
                        <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                        <button className='positive_button' type='submit'>Edit</button>
                    </div>
                </form>
            </>
        );
    }


    const handleDelete = (indexToDel) => {
        try {
            setUserData((prevData) => ({
                ...prevData,
                cselegibility: prevData.cselegibility.filter((value, index)=>index !== indexToDel)
            }));
            
        } catch (error) {
            setError({title: "Delete Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
        }
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
                <div className="cs_elegibilty content_container">
                    <div className='page_title'>
                        <img src={icons.civilserviceeligibility} alt="Photo" />
                        <p>Civil Service Eligibility</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2" style={{width: "20px"}}>#</th>
                                        <th rowSpan="2">Action</th>
                                        <th rowSpan="2">Professional Certifications </th>
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
                                {userdata.cselegibility.length < 1 && 
                                
                                    <tr>
                                        <td colSpan="9">No Records Yet.</td>
                                    </tr>
                                }

                                {userdata.cselegibility.length > 0 && userdata.cselegibility.map((value, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className='action_cell'>
                                                <div>
                                                    <div>
                                                        <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+value.profissionalcert, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                        <span>Delete</span>
                                                    </div>
                                                    <div>
                                                        <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditData index={index} data={{...value}}/>})}}/>
                                                        <span>Edit</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{value.profissionalcert}</td>
                                            <td>{value.rating}</td>
                                            <td>{value.dateofexam}</td>
                                            <td>{value.venueofexam}</td>
                                            <td>{value.licenseno}</td>
                                            <td>{value.licensevalidity}</td>
                                        </tr>
                                    )
                                })}
                                    
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Civil Service Elegibilty', children: <AddData/>})}}>Add Record</button>
                                <button className='positive_button'onClick={()=>{handleSave()}}>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default CivilServiceEligibility;
