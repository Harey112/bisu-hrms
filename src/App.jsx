import './global-styles.css'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { AuthProvider } from './context/auth/authprovider';

import HRRoutes from './routes/hr';
import LeaderRoutes from './routes/leader';
import Login from './pages/Login/login';
import { PrivateRoute } from './context/routeprotocol/private';
import { UserProvider } from './context/user/userprovider';


function App() {
  

  return (
    <>
    
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/*" element={<PrivateRoute><UserProvider><HRRoutes /></UserProvider></PrivateRoute>} />
            <Route path="/*" element={<PrivateRoute><LeaderRoutes /></PrivateRoute>} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App

