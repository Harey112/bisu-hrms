import './styles/global-styles.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from './pages/User/Login';
import Dashboard from './pages/User/Dashboard';
import Department from './pages/User/Department';
import College from './pages/User/College';
import Employees from './pages/User/Employees';
import Attendance from './pages/User/Attendance';
import Leave from './pages/User/Leave';
import Report from './pages/User/Report';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login/> }/>
          <Route path="/dashboard" element={ <Dashboard/> }/>
          <Route path="/department" element={ <Department/> }/>
          <Route path="/college" element={ <College/> }/>
          <Route path="/employees" element={ <Employees/> }/>
          <Route path="/attendance" element={ <Attendance/> }/>
          <Route path="/leave" element={ <Leave/> }/>
          <Route path="/report" element={ <Report/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
