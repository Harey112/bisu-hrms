import './styles/global-styles.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from './fragments/layout';
import Login from './pages/User/Login';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
