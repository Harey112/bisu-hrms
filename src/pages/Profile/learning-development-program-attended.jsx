import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function LearningDevelopmentProgramAttended() {
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
        {name: 'Work Experience', route: '/profile/work-experience', icon: icons.workexperience, isSelected: false},
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: false},
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: true},
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
        const data = {title: '', datefrom: '', dateto: '', nohours: '', type: '', sponsor: ''};
        const [newData, setNewData] = useState({ ...data });

        const handleDataChange = (event) => {
            const { name, value } = event.target;
            setNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const handleAddData = (event) => {
            event.preventDefault(); 

            try {
                const updatedData = [...userdata.ldpa, { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    ldpa: updatedData,
                }));
                
                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };

        return (
            <form onSubmit={(e) => {handleAddData(e)}} className='add_edit_form'>
                <FormTextField type="text" label="Title of Program" name="title" width="300px" value={newData.title} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={newData.datefrom} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={newData.dateto} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Number of Hours" name="nohours" width="300px" value={newData.nohours} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Type of LD (Managerial/Technical/etc)" name="type" width="300px" value={newData.type} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Conducted/Sponsored By" name="sponsor" width="300px" value={newData.sponsor} onChange={(e)=>handleDataChange(e)}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit'>Add</button>
                </div>
            </form>
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

        }
        const handleEditData = (event) => {
            event.preventDefault(); 
            try {
                const updatedData = [...userdata.ldpa];
                updatedData[props.index] = { ...data };
                setUserData((prevData) => ({
                    ...prevData,
                    ldpa: updatedData,
                }));
                setCustomContent(null); 
            } catch (error) {
                setError({ title: "Edit Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
        return (    
            <form onSubmit={(e) => {handleEditData(e)}} className='add_edit_form'>
                <FormTextField type="text" label="Title of Program" name="title" width="300px" value={data.title} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={data.datefrom} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={data.dateto} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Number of Hours" name="nohours" width="300px" value={data.nohours} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Type of LD (Managerial/Technical/etc)" name="type" width="300px" value={data.type} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" label="Conducted/Sponsored By" name="sponsor" width="300px" value={data.sponsor} onChange={(e)=>handleDataChange(e)}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit'>Save</button>
                </div>
            </form>
        );
    };
    

    const handleDelete = (index) => {   
        try {
            setUserData((prevData) => ({
                ...prevData,
                ldpa: prevData.ldpa.filter((value, index)=>index !== index)
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
            <div className="ldpa content_container">
                    <div className='page_title'>
                        <img src={icons.learningdevelopmentprogramattended} alt="Photo" />
                        <p>Learning Development Program Attended</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2">#</th>
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
                                    {userdata.ldpa.length < 1 && 
                                    
                                    <tr>
                                        <td colSpan="8">No Records Yet.</td>
                                    </tr>
                                    }

                                    {userdata.ldpa.length > 0 && userdata.ldpa.map((data, index) => {
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className='action_cell'>
                                                <div>
                                                    <div>
                                                        <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.title, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                        <span>Delete</span>
                                                    </div>
                                                    <div>
                                                        <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditData index={index} data={{...data}}/>})}}/>
                                                        <span>Edit</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{data.title}</td>
                                            <td>{data.datefrom}</td>
                                            <td>{data.dateto}</td>
                                            <td>{data.nohours}</td>
                                            <td>{data.type}</td>
                                            <td>{data.sponsor}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Learning Development Program', children: <AddData />})}}>Add Record</button>
                                <button className='positive_button' onClick={() => {handleSave()}}>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default LearningDevelopmentProgramAttended;
