import './global-styles.css'
import { BrowserRouter, Route, Routes} from "react-router-dom";

import Login from './pages/Login/login';
import HRRoutes from './routes/hr';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <HRRoutes/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
