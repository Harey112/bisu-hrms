import './style.css';
import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";
import GridView from "../../fragments/gridview/gridview";

function Employees() {
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false},
        {name: 'Department', route: '/department', icon: icons.department, isSelected: false},
        {name: 'College', route: '/college', icon: icons.college, isSelected: false},
        {name: 'Employees', route: '/employees', icon: icons.employees, isSelected: true},
        {name: 'Attendance', route: '/attendance', icon: icons.attendance, isSelected: false},
        {name: 'Leave', route: '/leave', icon: icons.leave, isSelected: false},
        {name: 'Report', route: '/report', icon: icons.report, isSelected: false}
    ];
    
    const [routePath, setRoutePath] = useState('> Employees')
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);

    function employee_tile({name, img}){
        return <>
        <div onClick={() => actionFuntion(url)} className="content_container">
            <div >
                <img src={img} alt="profile" />
            </div>
            <p>{name}</p>
        </div>
        </>
    }


    const AddNewEmployee = () => {
        const [newEmployee, setNewEmployee] = useState({firstname: '', lastname: '', email: '', organization: '', role: ''});
        const [addMessage, setAddMessage] = useState({message: "Sample Message", color: "black"});
        const handleNewEmployeeChange = (event) => {
            
            try {
                const { name, value } = event.target;
                setNewEmployee({...newEmployee, [name]: value});
            } catch (error) {
                setError({title: "Add Employee Failed", message: error.message, button: { label: "Okay", action: () => { setError(null); } } });
            }

            console.log(newEmployee);
            
        };
    
    
    
    
    
    return (
        <form id="add_employee_form" >
            <FormTextField type="text" label="Firstname" name="firstname" width="100%" required={true} value={newEmployee.firstname} onChange={(e)=>handleNewEmployeeChange(e)}/>
            <FormTextField type="text" label="Lastname" name="lastname" width="100%" required={true} value={newEmployee.lastname} onChange={(e)=>handleNewEmployeeChange(e)}/>
            <FormTextField type="text" label="Email" name="email" width="100%" required={true} value={newEmployee.email} onChange={(e)=>handleNewEmployeeChange(e)}/>
            <FormTextField type="text" label="Department" name="organization" width="100%" required={true} value={newEmployee.organization} onChange={(e)=>handleNewEmployeeChange(e)}/>
            <FormTextField type="text" label="Role" name="role" width="100%" required={true} value={newEmployee.role} onChange={(e)=>handleNewEmployeeChange(e)}/>
            <div >
                <button type="button" className="neutral_button" onClick={()=> {setCustomContent(undefined)}}>Cancel</button>
                <button type="submit" className="positive_button">Add Employee</button>
            </div>
            <p style={{color: addMessage.color}}>{addMessage.message}</p>
        </form> );
    }



    const [employees, setEmployees] = useState([
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},        
    ]);



    return (
        <>
            <Layout routePath={routePath} menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="employee_container">
                    <div id="employee_toolbar">
                        <form>
                            <input type="search" name='search' placeholder="Search"/>
                            <select name="filter" placeholder="Department">
                                <option value=""></option>
                                <option value="">------------</option>
                            </select>
                        </form>
                        <button onClick={()=> {setCustomContent({title: 'Add Employee', children: <AddNewEmployee/>})}} className="positive_button">+ Add Employee</button>
                    </div>
                    
                    <div id="list_container"> 
                        <GridView items={employees} contentFunction={employee_tile} contentClassName='employees' itemDimension={{width: '150px', height: '160px'}}  />
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default Employees;
