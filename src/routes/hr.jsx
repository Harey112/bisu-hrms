import {Routes, Route, Navigate } from 'react-router-dom';


import Dashboard from '../pages/Dashboard/hr';
import Department from '../pages/Department/hr';
import College from '../pages/College/hr';
import Employees from '../pages/Employees/hr';
import Attendance from '../pages/Attendance/hr';
import Leave from '../pages/Leave/hr';
import Report from '../pages/Report/hr';
import Profile from '../pages/Profile/profile';



function HRRoutes() {
    return <>
        <Routes>
            <Route path="/dashboard" element={ <Dashboard/> }/>
            <Route path="/department" element={ <Department/> }/>
            <Route path="/college" element={ <College/> }/>
            <Route path="/employees" element={ <Employees/> }/>
            <Route path="/attendance" element={ <Attendance/> }/>
            <Route path="/leave" element={ <Leave/> }/>
            <Route path="/report" element={ <Report/> }/>
            <Route path="/profile" element={ <Profile/> }/>
        </Routes>
    </>
}


export default HRRoutes;