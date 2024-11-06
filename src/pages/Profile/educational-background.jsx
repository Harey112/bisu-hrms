import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function EducationalBackground() {
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
        {name: 'Educational Background', route: '/profile/educational-background', icon: icons.educationalbackground, isSelected: true},
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



    const AddData = () => {
       
        const data = { level: 'Elementary', nameofschool: '', degree: '', periodofattendencefrom: '', periodofattendenceto: '', highestdegree: '', yeargraduated: '', scholarshipandaward: '' };
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
                const updatedData = [...userdata.educationalbackground, { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    educationalbackground: updatedData,
                }));
                
                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
    
        return (
            <>
                <form onSubmit={(e) => { handleAddData(e) }} className='add_edit_form'>
                    <FormSelect choices={['Elementary', 'Secondary', 'Vocational/Trade Course', 'College', 'Graduate Studies']} label="Level" name="level" width="300px" value={newData.level} onChange={(e) => { handleDataChange(e)}} />
                    <FormTextField type="text" label="Name of School" name="nameofschool" width="300px" value={newData.nameofschool} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="text" label="Basic Education/Degree/Course" name="degree" width="300px" value={newData.degree} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="date" label="Period of Attendance(FROM)" name="periodofattendencefrom" width="300px" value={newData.periodofattendencefrom} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="date" label="Period of Attendance(TO)" name="periodofattendenceto" width="300px" value={newData.periodofattendenceto} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="text" label="Highest Level/Unit Earned (if not grduated)" name="highestdegree" width="300px" value={newData.highestdegree} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="number" label="Year Graduated" name="yeargraduated" width="300px" value={newData.yeargraduated} onChange={(e) => { handleDataChange(e)}}/>
                    <FormTextField type="text" label="Scholarship/Academic Honor Received" name="scholarshipandaward" value={newData.scholarshipandaward} width="300px" onChange={(e) => { handleDataChange(e)}}/>
                    
                    <div>
                        <button className="neutral_button" type="button" onClick={() => { setCustomContent(null) }}>Cancel</button>
                        <button className="positive_button" type="submit" >Add</button>
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
                const newArray = [...userdata.educationalbackground];
                newArray[props.index] = {...data}

                setUserData((prevData) => ({
                    ...prevData,
                    educationalbackground: newArray
                }));
                
            } catch (error) {
                setError({title: "Edit Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
            }
            
            setCustomContent(null)
        };

    
        return <>
        <form className='add_edit_form' onSubmit={(e) => {handleEditData(e)}}>
            <FormSelect choices={['Elementary', 'Secondary', 'Vocational/Trade Course', 'College', 'Graduate Studies']} label="Level" name="level" width="300px" value={data.level} onChange={(e) => { handleDataChange(e)}} />
            <FormTextField type="text" label="Name of School" name="nameofschool" width="300px" value={data.nameofschool} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="text" label="Basic Education/Degree/Course" name="degree" width="300px" value={data.degree} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="date" label="Period of Attendance(FROM)" name="periodofattendencefrom" width="300px" value={data.periodofattendencefrom} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="date" label="Period of Attendance(TO)" name="periodofattendenceto" width="300px" value={data.periodofattendenceto} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="text" label="Highest Level/Unit Earned (if not grduated)" name="highestdegree" width="300px" value={data.highestdegree} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="number" label="Year Graduated" name="yeargraduated" width="300px" value={data.yeargraduated} onChange={(e) => { handleDataChange(e)}}/>
            <FormTextField type="text" label="Scholarship/Academic Honor Received" name="scholarshipandaward" value={data.scholarshipandaward} width="300px" onChange={(e) => { handleDataChange(e)}}/>
            
            <div>
                <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                <button className='positive_button'>Edit</button>
            </div>
        </form>
        
        </>;
    }


    const handleDelete = (indexToDel) => {
        try {
            setUserData((prevData) => ({
                ...prevData,
                educationalbackground: prevData.educationalbackground.filter((value, index)=>index !== indexToDel)
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
                <div className="edu_bg content_container">
                    <div className='page_title'>
                        <img src={icons.educationalbackground} alt="Photo" />
                        <p>Educational Background</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2" style={{width: "20px"}}>#</th>
                                        <th rowSpan="2" className='action_cell'>Action</th>
                                        <th rowSpan="2">Level</th>
                                        <th rowSpan="2">Name of School</th>
                                        <th rowSpan="2">Basic Education/Degree/Course</th>
                                        <th colSpan="2">Period of Attendance<blockquote style={{fontWeight: "400"}}><i>(yyyy-mm-dd)</i></blockquote></th>

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
                                    {userdata.educationalbackground.length < 1 && <tr>
                                        <td colSpan="10">No Records Yet.</td>
                                    </tr>}

                                    {userdata.educationalbackground.length > 0 && 
                                    userdata.educationalbackground.map((data, i) => {
                                        return <tr key={i}>
                                            <td>{i+1}</td>
                                            <td className='action_cell'>
                                                <div>
                                                    <div>
                                                        <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.nameofschool, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(i); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                        <span>Delete</span>
                                                    </div>
                                                    <div>
                                                        <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditData index={i} data={{...data}}/>})}}/>
                                                        <span>Edit</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{data.level}</td>
                                            <td>{data.nameofschool}</td>
                                            <td>{data.degree}</td>
                                            <td>{data.periodofattendencefrom}</td>
                                            <td>{data.periodofattendenceto}</td>
                                            <td>{data.highestdegree}</td>
                                            <td>{data.yeargraduated}</td>
                                            <td>{data.scholarshipandaward}</td>
                                            
                                        </tr>
                                    }) 
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Educational Background', children: <AddData/>})}}>Add Record</button>
                                <button className='positive_button' onClick={() => { handleSave() }}>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default EducationalBackground;
