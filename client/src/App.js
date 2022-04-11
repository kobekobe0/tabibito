import './App.css'
import { useState } from 'react'
import axios from 'axios'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
