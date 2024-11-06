import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';

function VoluntaryWork() {
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
        {name: 'Voluntary Work', route: '/profile/voluntary-work', icon: icons.voluntarywork, isSelected: true},
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
        const data = {nameoforg: '', addressoforg: '', datefrom: '', dateto: '', nohours: '', position: ''};
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
                const updatedData = [...userdata.voluntarywork, { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    voluntarywork: updatedData,
                }));
                
                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };

        return (
            <form onSubmit={(e) => {handleAddData(e)}} className='add_edit_form'>
                <FormTextField type="text" label="Name of Organization" name="nameoforg" width="300px" value={newData.nameoforg} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Address of Organization" name="addressoforg" width="300px" value={newData.addressoforg} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={newData.datefrom} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={newData.dateto} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Number of Hours" name="nohours" width="300px" value={newData.nohours} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Position/Nature of Work" name="position" width="300px" value={newData.position} onChange={(e) => {handleDataChange(e)}}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit'>Add</button>
                </div>
            </form>);

    }


    const EditData = (props) => {
        const [data, setEditData] = useState({...props.data});
        console.log(props.data);
        

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
                const newArray = [...userdata.voluntarywork];
                newArray[props.index] = {...data}

                setUserData((prevData) => ({
                    ...prevData,
                    voluntarywork: newArray
                }));
                
            } catch (error) {
                setError({title: "Edit Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
            }
            
            setCustomContent(null)
        };


        return (
            <form onSubmit={(e) => {handleEditData(e)}} className='add_edit_form'>
                <FormTextField type="text" label="Name of Organization" name="nameoforg" width="300px" value={data.nameoforg} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Address of Organization" name="addressoforg" width="300px" value={data.addressoforg} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="date" label="Inclusive Dates(FROM)" name="datefrom" width="300px" value={data.datefrom} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="date" label="Inclusive Dates(TO)" name="dateto" width="300px" value={data.dateto} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Number of Hours" name="nohours" width="300px" value={data.nohours} onChange={(e) => {handleDataChange(e)}}/>
                <FormTextField type="text" label="Position/Nature of Work" name="position" width="300px" value={data.position} onChange={(e) => {handleDataChange(e)}}/>
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button' type='submit'>Edit</button>
                </div>
            </form>);
    }

    const handleDelete = (indexToDel) => {
        try {
            setUserData((prevData) => ({
                ...prevData,
                voluntarywork: prevData.voluntarywork.filter((value, index)=>index !== indexToDel)
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
            <div className="vol_work content_container">
                    <div className='page_title'>
                        <img src={icons.voluntarywork} alt="Photo" />
                        <p>Voluntary Work</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th rowSpan="2" style={{width: "20px"}}>#</th>
                                        <th rowSpan="2">Action</th>
                                        <th rowSpan="2">Name of Organization</th>
                                        <th rowSpan="2">Address of Organization</th>
                                        <th colSpan="2">Inclusive Dates</th>
                                        <th rowSpan="2">Number of Hours</th>
                                        <th rowSpan="2">Position/Nature of Work</th>
                                    </tr>
                                    <tr>
                                    <th style={{width: "10%"}}>From</th>
                                    <th style={{width: "10%"}}>To</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {userdata.voluntarywork.length < 1 && 
                                        <tr>
                                            <td colSpan="8">No Records Yet.</td>
                                        </tr>
                                    }

                                    {userdata.voluntarywork.length > 0 && 
                                        userdata.voluntarywork.map((value, index) => {
                                            return <tr key={index}>
                                                <td>{index+1}</td>
                                                <td className='action_cell'>
                                                    <div>
                                                        <div>
                                                            <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+value.nameoforg, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                            <span>Delete</span>
                                                        </div>
                                                        <div>
                                                            <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditData index={index} data={{...value}}/>})}}/>
                                                            <span>Edit</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{value.nameoforg}</td>
                                                <td>{value.addressoforg}</td>
                                                <td>{value.datefrom}</td>
                                                <td>{value.dateto}</td>
                                                <td>{value.nohours}</td>
                                                <td>{value.position}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                            <div className="profile_tool">
                                <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Voluntary Work', children: <AddData/>})}}>Add Record</button>
                                <button className='positive_button' onClick={() => {handleSave()}}>Save</button>
                            </div>
                </div>
            </Layout>
        </>
    );
}

export default VoluntaryWork;
