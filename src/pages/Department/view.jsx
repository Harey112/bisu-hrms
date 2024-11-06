import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import icons from "../../assets/icons";
import Layout from "../../fragments/layout";
import GridView from "../../fragments/gridview/gridview";

function ViewDepartment(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [routePath, setRoutePath] = useState('> Department')
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    const [employees, setEmployees] = useState([]);
    const [dean, setDean] = useState(null);
    const [chairperson, setChairperson] = useState(null);
    const [refresh, triggerRefresh] = useState(0);
 

    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Department', route: '/department', icon: icons.department, isSelected: true},
        {name: 'College', route: '/college', icon: icons.college, isSelected: false},
        {name: 'Employees', route: '/employees', icon: icons.employees, isSelected: false},
        {name: 'Attendance', route: '/attendance', icon: icons.attendance, isSelected: false},
        {name: 'Leave', route: '/leave', icon: icons.leave, isSelected: false},
        {name: 'Report', route: '/report', icon: icons.report, isSelected: false}
    ];


    useEffect(() => {
        if(location.state){
            setRoutePath('> Department > '+location.state.name)
        }else{
            navigate('/department');
        }
    });


    const EmployeeTile = ({name, position, onClickFunction}) => {
        return <>
        <div onClick={() => onClickFunction.func(onClickFunction.args)} className="content_container">
            <div >
                <img src={icons.defaultuser} alt="profile" />
            </div>
            <p>{name}</p>
        </div>
        </>
    }
    


    
    

    useEffect(() => {
        const fetchData = async () => {
            let querySnapshot = await getDocs(collection(db, "User"));
            let docs = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc.id);
            });

            let employeesList = await Promise.all(docs.map(async (id) => {
                let personalData = await getDoc(doc(db, "User", id, 'data', 'personal'));
                let accountData = await getDoc(doc(db, "User", id, 'data', 'account'));
                if(accountData.data().org === location.state.id){
                    return {position: accountData.data().position,
                        name: personalData.data().personalinfo.firstname+' '+ (personalData.data().personalinfo.middlename ? personalData.data().personalinfo.middlename[0].toUpperCase()+'. ' : '')+ personalData.data().personalinfo.lastname,
                         id: id, onClickFunction: {func: () => {
                        navigate('/profile/view', {state: { id: id} });
                    }, args: {id: id}}};
                }
                
                return null;

            }));

            employeesList = employeesList.filter((e) => e !== null);
            console.log(employeesList);
            
            employeesList.find((e) => {
                if(e.position === "Dean"){
                    setDean(e);
                }
                if(e.position === "Chairperson"){
                    setChairperson(e);
                }
            })
            setEmployees(employeesList.filter((f) => f.position !== "Dean"));
            setEmployees(employeesList.filter((f) => f.position !== "Chairperson"));

        };
        fetchData();
    }, [refresh]);
    


    return <>
        <Layout routePath={routePath} menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="department_container">
                    <div id="department_content">
                        <div id="department_head_container">
                            <div id="department_content_icon">
                                <img src={icons.department} alt="" />
                            </div>
                            <div id="department_content_title">
                                <h3>{location.state.name}</h3>
                                {location.state.description && 
                                <>
                                    <hr />
                                    <p>{location.state.description}</p>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div id="department_toolbar">
                        <form>
                            <img id='back' onClick={() => navigate(-1)} src={icons.backarrow}/>
                            <input type="search" name="search" placeholder="Search"/>
                        </form>
                    </div>

                    {(dean || chairperson) && <>
                        <p>Leader/s</p>
                        <div id="department_leader_display">
                        {dean && 
                            <div className="department_leader_container">
                                <div className="circle_bg"></div>
                                <div className="leader_img_container">
                                    <img src={icons.defaultuser} alt="" />
                                </div>
                                <div className="leader_info">
                                    <h3>{dean.name}</h3>
                                    <p>{dean.position}</p>
                                </div>
                            </div>
                        }

                        {chairperson &&
                            <div className="department_leader_container">
                                <div className="circle_bg"></div>
                                <div className="leader_img_container">
                                    <img src={icons.defaultuser} alt="" />
                                </div>
                                <div className="leader_info">
                                    <h3>{chairperson.name}</h3>
                                    <p>{chairperson.position}</p>
                                </div>
                            </div>
                        }
                        </div>
                    </>}
                    {employees.length > 0 && 
                    <>
                        <p className="section_title">Employees</p>
                        <div id="list_container">
                            <GridView items={employees} itemDimension={{width: '140px', height: '160px'}} contentComponent={EmployeeTile} contentClassName="employees"/>
                        </div>
                    </>
                    }

                    {!(dean || chairperson) && employees.length === 0 && <p className="section_title">No Employees Yet.</p> }
                    
                </div>

            </Layout>
    </>
}
export default ViewDepartment