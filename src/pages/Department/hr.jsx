import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";
import GridView from "../../fragments/gridview/gridview";

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
    
    function department_tile({name, img, url, actionFuntion}){
        return <>
        <div onClick={() => actionFuntion(url)} className="content_container center_child">
            <div >
                <img src={img} alt="profile" />
            </div>
            <p>{name}</p>
        </div>
        </>
    }

    const [departments, setDepartments] = useState([
        {name: 'Juan Dela Cruz', img: '#', url:"#", actionFuntion: (arg)=>{console.log(arg);}},
    ]);


    const addDepartmentComponent = (
        <form id="add_department_form" method="POST" action="" >

        </form>
    );



    


    return (
        <>
            <Layout routePath={routePath} menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <div id="employee_container">
                    <div id="employee_toolbar">
                        <form>
                            <input type="search" name="search" placeholder="Search"/>
                        </form>
                        <button onClick={()=> {setCustomContent({title: 'Add Employee', children: addDepartmentComponent})}} className="positive_button">+ Add Department</button>
                    </div>
                    
                    <div id="list_container"> 
                        <GridView items={departments} contentFunction={department_tile} contentClassName='employees' itemDimension={{width: '150px', height: '160px'}}  />
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default Department;
