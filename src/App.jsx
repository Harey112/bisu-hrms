import './styles/Global-Styles.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from './components/Layout';
import Login from './components/User/Login';


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
