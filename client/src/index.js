import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
axios.defaults.baseURL = 'https://tabibit-o.herokuapp.com/api/'
axios.defaults.headers.common['AUTHORIZATION'] = localStorage.getItem('user')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
