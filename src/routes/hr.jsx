import {Routes, Route, Navigate } from 'react-router-dom';


import Login from '../pages/Login/login';
import Dashboard from '../pages/Dashboard/hr';
import Department from '../pages/Department/hr';
import College from '../pages/College/hr';
import Employees from '../pages/Employees/hr';
import Attendance from '../pages/Attendance/hr';
import Leave from '../pages/Leave/hr';
import Report from '../pages/Report/hr';



function HRRoutes() {
    return <>
        <Routes>
            <Route path="/login" element={ <Dashboard/> }/>
            <Route path="/dashboard" element={ <Dashboard/> }/>
            <Route path="/department" element={ <Department/> }/>
            <Route path="/college" element={ <College/> }/>
            <Route path="/employees" element={ <Employees/> }/>
            <Route path="/attendance" element={ <Attendance/> }/>
            <Route path="/leave" element={ <Leave/> }/>
            <Route path="/report" element={ <Report/> }/>
        </Routes>
    </>
}


export default HRRoutes;