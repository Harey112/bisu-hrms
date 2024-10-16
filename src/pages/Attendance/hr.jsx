import Layout from "../../fragments/layout";
import base64Icons from "../../assets/icons";
import { useState } from "react";

function Attendance() {
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
            name: 'Employees', route: '/employees', icon: base64Icons.employees, isSelected: false
        },{
            name: 'Attendance', route: '/attendance', icon: base64Icons.attendance, isSelected: true
        },{
            name: 'Leave', route: '/leave', icon: base64Icons.leave, isSelected: false
        },{
            name: 'Report', route: '/report', icon: base64Icons.report, isSelected: false
        }
    ];
    



    return (
        <>
            <Layout menu={menu} error={error} prompt={prompt} message={message} operation={operation} customContent={customContent}>
                <p>Hello</p>
            </Layout>
        </>
    );
}

export default Attendance;
