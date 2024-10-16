import Layout from "../../fragments/layout";
import base64Icons from "../../assets/icons";
import { useEffect, useState } from "react";
import FormTextField from "../../fragments/form/textfield";
import GridView from "../../fragments/gridview/gridview";

function College() {
    const menu = [
        {name: 'Dashboard', route: '/dashboard', icon: base64Icons.dashboard, isSelected: false},
        {name: 'Department', route: '/department', icon: base64Icons.department, isSelected: false},
        {name: 'College', route: '/college', icon: base64Icons.college, isSelected: true},
        {name: 'Employees', route: '/employees', icon: base64Icons.employees, isSelected: false},
        {name: 'Attendance', route: '/attendance', icon: base64Icons.attendance, isSelected: false},
        {name: 'Leave', route: '/leave', icon: base64Icons.leave, isSelected: false},
        {name: 'Report', route: '/report', icon: base64Icons.report, isSelected: false}
    ];
    
    const [routePath, setRoutePath] = useState('> College')
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    function collegeTile({name, img, url, actionFuntion}){
        return <>
        <div onClick={() => actionFuntion(url)} className="content_container center_child">
            <div >
                <img src={img} alt="profile" />
            </div>
            <p>{name}</p>
        </div>
        </>
    }

    const [colleges, setColleges] = useState([
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
                            <input type="search" placeholder="Search"/>
                        </form>
                        <button onClick={()=> {setCustomContent({title: 'Add Employee', children: addDepartmentComponent})}} className="positive_button">+ Add College</button>
                    </div>
                    
                    <div id="list_container"> 
                        <GridView items={colleges} contentFunction={collegeTile} contentClassName='employees' itemDimension={{width: '150px', height: '160px'}}  />
                    </div>
                </div>

            </Layout>
        </>
    );
}

export default College;
