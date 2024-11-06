import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import FormSelect from '../../fragments/form/select'
import { data } from '../../../util functions/datatemp';


function OtherInformation() {
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
        {name: 'Learning Development Program Attended', route: '/profile/learning-development-program-attended', icon: icons.learningdevelopmentprogramattended, isSelected: false},
        {name: 'Other Information', route: '/profile/other-information', icon: icons.otherinformation, isSelected: true},
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

        const data = {info: 'Special Skills and Hobbies', title: ''};
        const [newData, setNewData] = useState({ ...data });

        const handleDataChange = (event) => {
            const { name, value } = event.target;
            console.log(name, value);
            
            setNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            console.log(newData);
            
        };

        const handleAddData = (event) => {
            event.preventDefault(); 
            let index = '';
            

            if(newData.info === 'Special Skills and Hobbies'){
                index = 'specialskills';
            }else if(newData.info === 'Non-academic Distinction/Recognition'){
                index = 'nonacademic';
            }else if(newData.info === 'Membership in Association/Organization'){
                index = 'membership';
            }
            
            try {
                const updatedData = [...userdata.otherinfo[index], { ...newData }];
                
                setUserData((prevData) => ({
                    ...prevData,
                    otherinfo:{
                        ...prevData.otherinfo,
                        [index]: updatedData
                    }
                }));

                setNewData({ ...data }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
        

        return (
            <form onSubmit={(e) => {handleAddData(e)}} className='add_edit_form'>
                <FormSelect label="Title of Program" name="info" width="300px" value={newData.info} choices={['Special Skills and Hobbies', 'Non-academic Distinction/Recognition', 'Membership in Association/Organization']} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" name="title" label="Skills/Hobbies/Recognition/Association" width="300px" value={newData.title} onChange={(e)=>{handleDataChange(e)}} />
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button'>Add</button>
                </div>
            </form>
        )
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

        const handleEditData = (event) => {
            event.preventDefault(); 
            try {
                const newArray = [...userdata.otherinfo[props.path]];
                newArray[props.index] = {...data};
                setUserData((prevData) => ({
                    ...prevData,
                    otherinfo: {
                        ...prevData.otherinfo,
                        [props.path]: newArray
                    }
                }));
                setCustomContent(null); 
            } catch (error) {
                setError({ title: "Edit Data Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
        return (
            <form onSubmit={(e) => {handleEditData(e)}} className='add_edit_form'>
                <FormSelect label="Title of Program" name="info" value={data.info} width="300px"choices={['Special Skills and Hobbies', 'Non-academic Distinction/Recognition', 'Membership in Association/Organization']} onChange={(e)=>handleDataChange(e)}/>
                <FormTextField type="text" name="title" label="Skills/Hobbies/Recognition/Association" width="300px" onChange={(e)=>{handleDataChange(e)}} value={data.title}/> 
                <div>
                    <button className="neutral_button" type='button' onClick={()=> {setCustomContent(null)}}>Cancel</button>
                    <button className='positive_button'>Save</button>
                </div>
            </form>
        );
    };


    const handleDelete = (path, indexToDel) => {

        try {
            setUserData((prevData) => ({
                ...prevData,
                otherinfo: {
                    ...prevData.otherinfo,
                    [path]: prevData.otherinfo[path].filter((value, index)=>index !== indexToDel)
                }
            }));
            
        } catch (error) {
            setError({title: "Delete Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
        }

    }


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
            <div className="other_info content_container">
                    <div className='page_title'>
                        <img src={icons.otherinformation} alt="Photo" />
                        <p>Other Information</p>
                    </div>
                    <div className="group_form auto_overflow_x">

                            <table className='profile_table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className='action_cell' >Action</th>
                                        <th>Special Skills and Hobbies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userdata.otherinfo.specialskills.length < 1 && 
                                    <tr>
                                        <td colSpan="3">No Records Yet.</td>
                                    </tr>}

                                    {userdata.otherinfo.specialskills.length > 0 && userdata.otherinfo.specialskills.map((data, index)=>{
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className='action_cell'>
                                                <div>
                                                    <div>
                                                        <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.title, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete("specialskills", index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                        <span>Delete</span>
                                                    </div>
                                                    <div>
                                                        <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Data', children: <EditData index={index} path="specialskills" data={{...data}}/>})}}/>
                                                        <span>Edit</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{data.title}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    <div className="group_form auto_overflow_x">

                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className='action_cell' >Action</th>
                                    <th>Non-academic Distinction/Recognition</th>
                                    </tr>
                            </thead>
                            <tbody>
                               {userdata.otherinfo.nonacademic.length < 1 &&
                                <tr>
                                    <td colSpan="3">No Records Yet.</td>
                                </tr>}
                                {userdata.otherinfo.nonacademic.length > 0 && userdata.otherinfo.nonacademic.map((data, index)=>{
                                    return <tr key={index}>
                                        <td>{index+1}</td>
                                        <td className='action_cell'>
                                            <div>
                                                <div>  
                                                    <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.title, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete("nonacademic", index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                    <span>Delete</span>
                                                </div>
                                                <div>
                                                    <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Data', children: <EditData index={index} path="nonacademic" data={{...data}}/>})}}/>
                                                    <span>Edit</span>
                                                </div>
                                            </div>
                                        </td>    
                                        <td>{data.title}</td>
                                    </tr>
                                })}  
                                                    
                            </tbody>
                        </table>
                    </div>
                    <div className="group_form auto_overflow_x">

                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className='action_cell' >Action</th>
                                    <th>Membership in Association/Organization</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.otherinfo.membership.length < 1 &&
                                <tr>
                                    <td colSpan="3">No Records Yet.</td>
                                </tr>}
                                {userdata.otherinfo.membership.length > 0 && userdata.otherinfo.membership.map((data, index)=>{
                                    return <tr key={index}>
                                        <td>{index+1}</td>
                                        <td className='action_cell'>
                                            <div>
                                                <div>
                                                    <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+data.title, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete("membership", index); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                    <span>Delete</span>
                                                </div>
                                                <div>
                                                    <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Data', children: <EditData index={index} path="membership" data={{...data}}/>})}}/>
                                                    <span>Edit</span>
                                                </div>
                                            </div>
                                        </td>    
                                        <td>{data.title}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                        <div className="profile_tool">
                            <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Other Information', children: <AddData />})}}>Add Record</button>
                            <button className='positive_button' onClick={()=>{handleSave()}}>Save</button>
                        </div>
            </div>
            </Layout>
        </>
    );
}

export default OtherInformation;
