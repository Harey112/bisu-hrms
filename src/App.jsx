import './global-styles.css'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import HRRoutes from './routes/hr';
import Login from './pages/Login/login';


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Navigate to="/login"/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/*" element={<HRRoutes />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

