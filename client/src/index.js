import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.headers.common['AUTHORIZATION'] = localStorage.getItem('user')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
