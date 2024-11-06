import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";
import GridView from "../../fragments/gridview/gridview";
import {db} from '../../firebase-config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Department() {
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Department', route: '/department', icon: icons.department, isSelected: true},
        {name: 'College', route: '/college', icon: icons.college, isSelected: false},
        {name: 'Employees', route: '/employees', icon: icons.employees, isSelected: false},
        {name: 'Attendance', route: '/attendance', icon: icons.attendance, isSelected: false},
        {name: 'Leave', route: '/leave', icon: icons.leave, isSelected: false},
        {name: 'Report', route: '/report', icon: icons.report, isSelected: false}
    ];
    
    const [routePath, setRoutePath] = useState('> Department')
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [refresh, triggerRefresh] = useState(0);
    const navigate = useNavigate();


    const handleSearch = (e) => {
        setSearch(e.target.value);
    }



    useEffect(() => {
        const getDepartments = async () => {
            try {
                setLoading(true);
                if (!navigator.onLine) {

                    throw new Error("No Internet Connection. Please check your internet connection and try again.");
                }

                const querySnapshot = await getDocs(collection(db, "Organization"));
                const docs = [];
                
                querySnapshot.forEach((doc) => {
                    if (doc.data().type === "Department"){
                        docs.push({...doc.data(), id: doc.id, onClickFunction: {func: (args) => {
                            navigate('/department/view', {state: { id: args.id, name: args.name, description: args.description } });
                        }, args: {id: doc.id, name: doc.data().name, description: doc.data().description}}});
                    }
                });

                const filtered = docs.filter(doc => {
                    const name = doc.name.toLowerCase();
                    const searchValue = search.toLowerCase();
                    return name.includes(searchValue);
                });
                setDepartments(filtered);

                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError({title: "Get Department Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
        }
        getDepartments();
    }, [refresh, search]);



    
const DepartmentTile = ({name, description, onClickFunction}) => {
        return <>
        <div onClick={() => onClickFunction.func(onClickFunction.args)} className="content_container">
            <div className='circle'>
                <img src={icons.department} alt="profile" />
            </div>
            <div className='department_name'>
                <p className='name'>{name}</p>
                {description &&
                <>
                    <hr />
                    <p className='description'>{description}</p>
                </>
                }
            </div>
        </div>
        </>
    }


    const AddDepartment = () => {
        const data = { name: '', description: '', type: 'Department' };
        const [newDepartment, setNewDepartment] = useState({...data});

        const handleNewDepartmentChange = (event) => {

            try {
                const { name, value } = event.target;
                setNewDepartment({...newDepartment, [name]: value});
            } catch (error) {
                setError({title: "Add Department Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }
            
        };


        const addDepartment = (e) => {
            e.preventDefault();

            try {
                setOperation({ title: "Status", message: "Adding Department..." });
                if (!navigator.onLine) { 
                    throw new Error("No Internet Connection. Please check your internet connection and try again.");
                }
                const docRef = doc(collection(db, "Organization"));
                setDoc(docRef, newDepartment);
                setNewDepartment({...data});
                setOperation(null);
                triggerRefresh(Math.random());
            } catch (error) {
                setOperation(null);
                setError({title: "Add Department Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
                triggerRefresh(Math.random());
            }
        }




        return <form id="add_department_form" onSubmit={(e)=>{ addDepartment(e)}}>
            <FormTextField type="text" label="Department Name" name="name" width="100%" required={true} value={newDepartment.name} onChange={(e)=>handleNewDepartmentChange(e)}/>
            <FormTextField type="text" label="Description(Optional)" name="description" width="100%" value={newDepartment.description} onChange={(e)=>handleNewDepartmentChange(e)}/>
            <div >
                <button type="button" className="neutral_button" onClick={()=> {setCustomContent(null)}}>Close</button>
                <button type="submit" className="positive_button">Add Department</button>
            </div>
        </form>
    }



    


    return (
        <>
            <Layout routePath={routePath} menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="department_container">
                    <div id="department_toolbar">
                        <form onSubmit={(e)=>{e.preventDefault(); triggerRefresh(Math.random())}}>
                            <input type="search" name="search" placeholder="Search" value={search} onChange={(e) => handleSearch(e)}/>
                        </form>
                        <button onClick={()=> {setCustomContent({title: 'Add Department', children: <AddDepartment />})}} className="positive_button">+ Add Department</button>
                    </div>
                    
                    <div id="list_container"> 
                        {loading ? <p>Loading...</p> : 
                            <GridView items={departments} contentComponent={DepartmentTile} contentClassName='departments' itemDimension={{width: '300px', height: '100px'}}  />
                        }
                        {!loading && departments.length === 0 && <p>No Department Yet.</p>}
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default Department;
