import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function WorkExperience() {
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
        {name: 'Civil Service Eligibility', route: '/profile/civil-service-eligibility', icon: icons.civilserviceeligibility, isSelected: false},
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: true},
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
        const data = { datefrom: '', dateto: '', position: '', designation: '', company: '', duration: '', salary: '', salarygrade: '', statsofappointment: '', isgovservice: 'Yes' };
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
                const updatedData = [...userdata.workexperience, { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    workexperience: updatedData,
                }));
                
                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };

        return <>
            <form onSubmit={(e) => handleAddData(e)} className='add_edit_form'>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={newData.datefrom} onChange={handleDataChange}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={newData.dateto} onChange={handleDataChange}/>
                <FormTextField type="text" label="Postion Title" name="position" width="300px" value={newData.position} onChange={handleDataChange}/>
                <FormTextField type="text" label="Department/Agency/Office/Company" name="designation" width="300px" value={newData.designation} onChange={handleDataChange}/>
                <FormTextField type="text" label="Monthly Salary" name="salary" width="300px" value={newData.salary} onChange={handleDataChange}/>
                <FormTextField type="text" label="Salary Grade & Step/Increment" name="salarygrade" width="300px" value={newData.salarygrade} onChange={handleDataChange}/>
                <FormTextField type="text" label="Status of Appointment" name="statsofappointment" width="300px" value={newData.statsofappointment} onChange={handleDataChange}/>
                <FormSelect label="Is Government Service" name="isgovservice" width="300px" value={newData.isgovservice} onChange={handleDataChange} choices={['Yes', 'No']}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit' onClick={handleAddData}>Add</button>
                </div>
            </form> 
        </>;
    };


    const EditData = (props) => {
        const [data, setEditData] = useState({...props.data}); 


        const handleEditDataChange = (event) => {
            const { name, value } = event.target;
            
            setEditData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };

        const handleEditData = (e) => {
            e.preventDefault();
            
            try {
                const newWorkExperienceArray = [...userdata.workexperience];
                newWorkExperienceArray[props.index] = {...data};
                setUserData((prevData) => ({
                    ...prevData,
                    workexperience: newWorkExperienceArray
                }));
                
            } catch (error) {
                setError({title: "Edit Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
            }
            
            setCustomContent(null);
        };


        return <>
            <form onSubmit={(e) => handleEditData(e)} className='add_edit_form'>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={data.datefrom} onChange={handleEditDataChange}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={data.dateto} onChange={handleEditDataChange}/>
                <FormTextField type="text" label="Postion Title" name="position" width="300px" value={data.position} onChange={handleEditDataChange}/>
                <FormTextField type="text" label="Department/Agency/Office/Company" name="designation" width="300px" value={data.designation} onChange={handleEditDataChange}/>
                <FormTextField type="text" label="Monthly Salary" name="salary" width="300px" value={data.salary} onChange={handleEditDataChange}/>
                <FormTextField type="text" label="Salary Grade & Step/Increment" name="salarygrade" width="300px" value={data.salarygrade} onChange={handleEditDataChange}/>
                <FormTextField type="text" label="Status of Appointment" name="statsofappointment" width="300px" value={data.statsofappointment} onChange={handleEditDataChange}/>
                <FormSelect label="Is Government Service" name="isgovservice" width="300px" choices={['Yes', 'No']} value={data.isgovservice} onChange={handleEditDataChange}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit' onClick={handleEditData}>Edit</button>
                </div>
            </form> 
        </>;
    };



    const handleDelete = (indexToDel) => {
        try {
            setUserData((prevData) => ({
                ...prevData,
                workexperience: prevData.workexperience.filter((value, index)=>index !== indexToDel)
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
            <div className="work_exp content_container">
                    <div className='page_title'>
                        <img src={icons.workexperience} alt="Photo" />
                        <p>Work Experience</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">#</th>
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
                                    {userdata.workexperience.length < 1 && <tr>
                                        <td colSpan="10" style={{textAlign: "center"}}>No Record Found</td>
                                    </tr>}

                                    {userdata.workexperience.map((data, index) => (
                                        
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className="action_cell">
                                                <div>
                                                    <div>
                                                        <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.position, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                        <span>Delete</span>
                                                    </div>
                                                    <div>
                                                        <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditData index={index} data={{...data}}/>})}}/>
                                                        <span>Edit</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{data.datefrom}</td>
                                            <td>{data.dateto}</td>
                                            <td>{data.position}</td>
                                            <td>{data.designation}</td>
                                            <td>{data.salary}</td>
                                            <td>{data.salarygrade}</td>
                                            <td>{data.statsofappointment}</td>
                                            <td>{data.isgovservice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Work Experience', children: <AddData/>})}}>Add Record</button>
                                <button className='positive_button'onClick={()=>handleSave()} >Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default WorkExperience;
