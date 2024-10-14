import Layout from "../../fragments/layout";
import base64Icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";

function Employees() {
    const [routePath, setRoutePath] = useState('> Employees')
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {   name: 'Dashboard', route: '/dashboard', icon: base64Icons.dashboard, isSelected: false
        },{
            name: 'Department', route: '/department', icon: base64Icons.department, isSelected: false
        },{
            name: 'College', route: '/college', icon: base64Icons.college, isSelected: false
        },{
            name: 'Employees', route: '/employees', icon: base64Icons.employees, isSelected: true
        },{
            name: 'Attendance', route: '/attendance', icon: base64Icons.attendance, isSelected: false
        },{
            name: 'Leave', route: '/leave', icon: base64Icons.leave, isSelected: false
        },{
            name: 'Report', route: '/report', icon: base64Icons.report, isSelected: false
        }
    ];


    /* useEffect(() => {
      setError({title: "ERROR", message: "Error 404", button: {label: 'Close', action: ()=> {setError(undefined);}}});
    

    }, []) */

    const addEmployeeComponent = (
        <form id="add_employee_form" action="" >
            <FormTextField type="text" label="Firstname" name="firstname" width="80%"/>
            <FormTextField type="text" label="Lastname" name="lastname" width="80%"/>
            <FormTextField type="text" label="Email" name="email" width="80%"/>
            <FormTextField type="text" label="Department" name="department" width="80%"/>
            <FormTextField type="text" label="Role" name="role" width="80%"/>
            <FormTextField type="text" label="User Type" name="usertype" width="80%"/>
            <div >
                <button type="reset" className="neutral_button">Reset</button>
                <button type="submit" className="positive_button">Add Employee</button>
            </div>
            <p>Messages Here</p>
        </form>
    );
    




    return (
        <>
            <Layout routePath={routePath} menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="employee_container">
                    <form>
                        <input type="search" placeholder="Search"/>
                        <select name="" id=""></select>
                    </form>
                    <button onClick={()=> {setCustomContent({title: 'Add Employee', children: addEmployeeComponent})}} className="positive_button">+ Add Employee</button>
                </div>
            </Layout>
        </>
    );
}

export default Employees;
