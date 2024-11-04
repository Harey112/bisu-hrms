import './style.css';
import { useUser } from '../../context/user/userprovider';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState, useEffect } from "react";
import FormTextField from '../../fragments/form/textfield';
import { data } from '../../../util functions/datatemp';


function FamilyBackground() {
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
        {name: 'Family Background', route: '/profile/family-background', icon: icons.familybackground, isSelected: true},
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



    const AddChild = () => {
        const child = { fullname: '', dateofbirth: '' };
        const [newChild, setNewChild] = useState({ ...child });
    
        const handleNewChildDataChange = (event) => {
            const { name, value } = event.target;
            setNewChild((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
    
        const handleAddChild = (e) => {
            e.preventDefault();
            
            try {
                setOperation({ title: "Add New Child", message: "Adding " + newChild.fullname + "..." });
                const updatedChildren = [...userdata.familybackground.children, { ...newChild }];
                
                updatedChildren.sort((a, b) => new Date(a.dateofbirth) - new Date(b.dateofbirth));
                
                setUserData((prevData) => ({
                    ...prevData,
                    familybackground: {
                        ...prevData.familybackground,
                        children: updatedChildren,
                    },
                }));
                
                setNewChild({ ...child }); 
                setCustomContent(null); 
                
            } catch (error) {
                setError({ title: "Add Child Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        };
    
        return (
            <>
                <form className="add_edit_form" onSubmit={(e) => { handleAddChild(e) }}>
                    <FormTextField type="text" label="Fullname" name="fullname" value={newChild.fullname} onChange={(e) => { handleNewChildDataChange(e) }} width="300px" required />
                    <FormTextField type="date" label="Date of birth" name="dateofbirth" value={newChild.dateofbirth} onChange={(e) => { handleNewChildDataChange(e) }} width="300px" required />
                    <div>
                        <button className="neutral_button" type="button" onClick={() => { setCustomContent(null) }}>Cancel</button>
                        <button className="positive_button" type="submit">Add</button>
                    </div>
                </form>
            </>
        );
    };
    



    const EditChild = (props) => {
        const [child, setEditChild] = useState({...props.data});
     
    
    
        const handleEditChildDataChange = (event) => {
            const { name, value } = event.target;
            
            setEditChild((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };


    
        const handleEditChild = (e) => {
            e.preventDefault();
            
            try {
                const newChildrenArray = [...userdata.familybackground.children];
                newChildrenArray[props.index] = {...child}

                newChildrenArray.sort((a, b) => new Date(a.dateofbirth) - new Date(b.dateofbirth));

                setUserData((prevData) => ({
                    ...prevData,
                    familybackground: {
                        ...prevData.familybackground,
                        children: newChildrenArray,
                    },
                }));
                
            } catch (error) {
                setError({title: "Add Child Failed", message: error.message, button:{label: "Okay", action: () => {setError(null)}}});
            }
            
            setCustomContent(null)
        };

    
        return <>
        <form className='add_edit_form' onSubmit={(e) => {handleEditChild(e)}}>
            <FormTextField type="text" label="Fullname"  name="fullname" value={child.fullname}  onChange={(e) => {handleEditChildDataChange(e)}} width="300px" required={true}/>
            <FormTextField type="date" label="Date of birth"  name="dateofbirth" value={child.dateofbirth} onChange={(e) => {handleEditChildDataChange(e)}} width="300px" required={true}/>
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
                familybackground: {
                    ...prevData.familybackground,
                    children: prevData.familybackground.children.filter((value, index)=>index !== indexToDel ),
                },
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
                <div className="family_bg_container content_container">
                    <div className='page_title'>
                        <img src={icons.familybackground} alt="Photo" />
                        <p>Family Background</p>
                    </div>
                    <div className="group_form">
                    <h5>Spouse's Info</h5>
                    <div className='section'>
                        <FormTextField type="text" label="Firstname" value={userdata.familybackground.spouse.firstname} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.firstname")}/>
                        <FormTextField type="text" label="Middlename" value={userdata.familybackground.spouse.middlename} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.middlename")}/>
                        <FormTextField type="text" label="Surname" value={userdata.familybackground.spouse.lastname} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.lastname")}/>
                        <FormTextField type="text" label="Extension" value={userdata.familybackground.spouse.nameextension} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.nameextension")}/>
                    </div>
                    <div className='section'>
                        <FormTextField type="text" label="Occupation" value={userdata.familybackground.spouse.occupation} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.occupation")}/>
                        <FormTextField type="text" label="Employer/Business Name" value={userdata.familybackground.spouse.businessname} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.businessname")}/>
                        <FormTextField type="text" label="Business Address" value={userdata.familybackground.spouse.businessadd} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.businessadd")}/>
                        <FormTextField type="text" label="Telephone No." value={userdata.familybackground.spouse.telno} width="24%" onChange={(e) => handleChange(e, "familybackground.spouse.telno")}/>
                    </div>
                </div>

                <div className="group_form">
                    <h5>Father's Info</h5>
                    <div className='section'>
                        <FormTextField type="text" label="Firstname" value={userdata.familybackground.father.firstname} width="24%" onChange={(e) => handleChange(e, "familybackground.father.firstname")}/>
                        <FormTextField type="text" label="Middlename" value={userdata.familybackground.father.middlename} width="24%" onChange={(e) => handleChange(e, "familybackground.father.middlename")}/>
                        <FormTextField type="text" label="Surname" value={userdata.familybackground.father.lastname} width="24%" onChange={(e) => handleChange(e, "familybackground.father.lastname")}/>
                        <FormTextField type="text" label="Extension" value={userdata.familybackground.father.nameextension} width="24%" onChange={(e) => handleChange(e, "familybackground.father.nameextension")}/>
                    </div>
                    <div className='section'>
                        <FormTextField type="text" label="Occupation" value={userdata.familybackground.father.occupation} width="24%" onChange={(e) => handleChange(e, "familybackground.father.occupation")}/>
                        <FormTextField type="text" label="Employer/Business Name" value={userdata.familybackground.father.businessname} width="24%" onChange={(e) => handleChange(e, "familybackground.father.businessname")}/>
                        <FormTextField type="text" label="Business Address" value={userdata.familybackground.father.businessadd} width="24%" onChange={(e) => handleChange(e, "familybackground.father.businessadd")}/>
                        <FormTextField type="text" label="Telephone No." value={userdata.familybackground.father.telno} width="24%" onChange={(e) => handleChange(e, "familybackground.father.telno")}/>
                    </div>
                </div>

                <div className="group_form">
                    <h5>Mother's Maiden Info</h5>
                    <div className='section'>
                        <FormTextField type="text" label="Firstname" value={userdata.familybackground.mother.firstname} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.firstname")}/>
                        <FormTextField type="text" label="Middlename" value={userdata.familybackground.mother.middlename} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.middlename")}/>
                        <FormTextField type="text" label="Surname" value={userdata.familybackground.mother.lastname} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.lastname")}/>
                        <FormTextField type="text" label="Extension" value={userdata.familybackground.mother.nameextension} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.nameextension")}/>
                    </div>
                    <div className='section'>
                        <FormTextField type="text" label="Occupation" value={userdata.familybackground.mother.occupation} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.occupation")}/>
                        <FormTextField type="text" label="Employer/Business Name" value={userdata.familybackground.mother.businessname} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.businessname")}/>
                        <FormTextField type="text" label="Business Address" value={userdata.familybackground.mother.businessadd} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.businessadd")}/>
                        <FormTextField type="text" label="Telephone No." value={userdata.familybackground.mother.telno} width="24%" onChange={(e) => handleChange(e, "familybackground.mother.telno")}/>
                    </div>
                </div>


                    <div className="group_form">
                        <h5>Children</h5>
                        <table className='profile_table'>
                            <thead>
                                <tr>
                                    <th style={{width: '20px'}}>#</th>
                                    <th className='action_cell'>Action</th>
                                    <th>Name of Children</th>
                                    <th>Date of Birth<blockquote style={{fontWeight: "400"}}><i>(yyyy-mm-dd)</i></blockquote></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.familybackground.children.length < 1 && <tr>
                                    <td colSpan="4">No Child Yet.</td>
                                </tr>}

                                {userdata.familybackground.children.length > 0 && 
                                
                                userdata.familybackground.children.map((child, i) => {
                                    return <tr key={i}>
                                        <td className='center_text'>{i+1}</td>
                                        <td className='action_cell'>
                                            <div>
                                                <img src={icons.delete} alt="delete" onClick={() => { setPrompt({title: 'Delete '+child.fullname, message: 'Do you want to proceed?',  positiveAction: {label: "Delete", action: () => {handleDelete(i); setPrompt(null);}}, negativeAction:{label: "Cancel", action: () => {setPrompt(null)}} })}}/>
                                                <img src={icons.edit} alt="edit" onClick={() => {setCustomContent({title: 'Edit Child', children: <EditChild index={i} data={{...child}}/>})}}/>
                                            </div>
                                        </td>
                                        <td>{child.fullname}</td>
                                        <td className='center_text'>{child.dateofbirth}</td>
                                    </tr>
                                })
                                
                                }
                            </tbody>
                        </table>
                        <div className="profile_tool">
                            <button className='positive_button' onClick={()=>{setCustomContent({title: 'Add Child', children: <AddChild/>})}}>Add Child</button>
                            <button className='positive_button' onClick={() => {handleSave()}}>Save</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default FamilyBackground;
