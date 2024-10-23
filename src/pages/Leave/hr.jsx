import Layout from "../../fragments/layout";
import icons from "../../assets/icons";
import { useState } from "react";

function Leave() {
    const [error, setError] = useState(undefined);
    const [prompt, setPrompt] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [operation, setOperation] = useState(undefined);
    const [customContent, setCustomContent] = useState(undefined);
    
    const menu = [
        {   name: 'Dashboard', route: '/dashboard', icon: icons.dashboard, isSelected: false
        },{
            name: 'Department', route: '/department', icon: icons.department, isSelected: false
        },{
            name: 'College', route: '/college', icon: icons.college, isSelected: false
        },{
            name: 'Employees', route: '/employees', icon: icons.employees, isSelected: false
        },{
            name: 'Attendance', route: '/attendance', icon: icons.attendance, isSelected: false
        },{
            name: 'Leave', route: '/leave', icon: icons.leave, isSelected: true
        },{
            name: 'Report', route: '/report', icon: icons.report, isSelected: false
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

export default Leave;
