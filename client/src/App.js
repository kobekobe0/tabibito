import './App.css'
import { useState } from 'react'
import axios from 'axios'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home'
import Modal from './Components/Modal/Modal'
import './Components/Home/navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import { MdPublic } from 'react-icons/md'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/post" element={<Modal />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
                <section>
                    <div className="navbar">
                        <div className="navbar-items">
                            <div className="navbar-item">
                                <Link to="/">
                                    <MdPublic size={50} />
                                </Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/">Public</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Router>
        </>
    )
}

export default App
