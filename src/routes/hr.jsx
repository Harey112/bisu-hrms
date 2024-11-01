import {Routes, Route, Navigate } from 'react-router-dom';


import Dashboard from '../pages/Dashboard/hr';
import Department from '../pages/Department/hr';
import College from '../pages/College/hr';
import Employees from '../pages/Employees/hr';
import Attendance from '../pages/Attendance/hr';
import Leave from '../pages/Leave/hr';
import Report from '../pages/Report/hr';
import Profile from '../pages/Profile/profile';
import FamilyBackground from '../pages/Profile/family-background';
import EducationalBackground from '../pages/Profile/educational-background';
import WorkExperience from '../pages/Profile/work-experience';
import CivilServiceEligibility from '../pages/Profile/civil-service-eligibility';
import VoluntaryWork from '../pages/Profile/voluntary-work';
import LearningDevelopmentProgramAttended from '../pages/Profile/learning-development-program-attended';
import OtherInformation from '../pages/Profile/other-information';



function HRRoutes() {
    return <>
        <Routes>
            <Route path='/dashboard' element={ <Dashboard/> }/>
            <Route path='/department' element={ <Department/> }/>
            <Route path='/college' element={ <College/> }/>
            <Route path='/employees' element={ <Employees/> }/>
            <Route path='/attendance' element={ <Attendance/> }/>
            <Route path='/leave' element={ <Leave/> }/>
            <Route path='/report' element={ <Report/> }/>
            <Route path='/profile' element={ <Profile/> }/>
            <Route path='/profile/family-background' element={<FamilyBackground/>}/>
            <Route path='/profile/educational-background' element={<EducationalBackground/>}/>
            <Route path='/profile/civil-service-eligibility' element={<CivilServiceEligibility/>}/>
            <Route path='/profile/work-experience' element={<WorkExperience/>}/>
            <Route path='/profile/voluntary-work' element={<VoluntaryWork/>}/>
            <Route path='/profile/learning-development-program-attended' element={<LearningDevelopmentProgramAttended/>}/>
            <Route path='/profile/other-information' element={<OtherInformation/>}/>
        </Routes>
    </>
}


export default HRRoutes;