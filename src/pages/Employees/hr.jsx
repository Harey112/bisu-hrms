import './style.css';
import Layout from "../../fragments/layout";
import base64Icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";
import GridView from "../../fragments/gridview/gridview";

function Employees() {
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: base64Icons.dashboard, isSelected: false},
        {name: 'Department', route: '/department', icon: base64Icons.department, isSelected: false},
        {name: 'College', route: '/college', icon: base64Icons.college, isSelected: false},
        {name: 'Employees', route: '/employees', icon: base64Icons.employees, isSelected: true},
        {name: 'Attendance', route: '/attendance', icon: base64Icons.attendance, isSelected: false},
        {name: 'Leave', route: '/leave', icon: base64Icons.leave, isSelected: false},
        {name: 'Report', route: '/report', icon: base64Icons.report, isSelected: false}
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

    const [employees, setEmployees] = useState([
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},        
    ]);


    const addEmployeeComponent = (
        <form id="add_employee_form" method="POST" action="" >
            <FormTextField type="text" label="Firstname" name="firstname" width="80%" required="true"/>
            <FormTextField type="text" label="Lastname" name="lastname" width="80%" required="true"/>
            <FormTextField type="text" label="Email" name="email" width="80%" required="true"/>
            <FormTextField type="text" label="Department" name="department" width="80%" required="true"/>
            <FormTextField type="text" label="Role" name="role" width="80%" required="true"/>
            <FormTextField type="text" label="User Type" name="usertype" width="80%" required="true"/>
            <div >
                <button type="button" className="neutral_button" onClick={()=> {setCustomContent(undefined)}}>Cancel</button>
                <button type="submit" className="positive_button">Add Employee</button>
            </div>
            <p>Messages Here</p>
        </form>
    );



    


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
                        <button onClick={()=> {setCustomContent({title: 'Add Employee', children: addEmployeeComponent})}} className="positive_button">+ Add Employee</button>
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
