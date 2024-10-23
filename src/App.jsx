import './global-styles.css'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { AuthProvider } from './context/auth/authprovider';

import HRRoutes from './routes/hr';
import LeaderRoutes from './routes/leader';
import Login from './pages/Login/login';
import { PrivateRoute } from './context/routeprotocol/private';


function App() {
  

  return (
    <>
    
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Navigate to="/login"/> }/>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/*" element={<PrivateRoute><HRRoutes /></PrivateRoute>} />
            <Route path="/*" element={<PrivateRoute><LeaderRoutes /></PrivateRoute>} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App

