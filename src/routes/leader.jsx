import { Route, Routes } from "react-router-dom"

function LeaderRoutes(){

    return (
        <>
            <Routes>
                <Route path="/dashboard" element={ <Dashboard/> }/>
            </Routes>
        </>
    )
}


export default LeaderRoutes;