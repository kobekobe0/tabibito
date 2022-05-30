import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import img from '../../images/login2.jpg'
import './login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let config = {
        //     headers: {
        //         authorization: token,
        //     },
        // }

        const data = await axios.post('http://localhost:3000/api/users/login', {
            email: email,
            password: password,
        })

        if (data.data.user) {
            localStorage.setItem('user', JSON.stringify(data.data.user))
            console.log(data.data.user)
            window.location.href = '/'
        } else {
            alert('Invalid email or password')
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode jwt token
            let user = jwt_decode(token)
            console.log(user)
            if (user) {
                window.location.href = '/'
            }
        }
    }, [])

    return (
        <div className="Login_page">
            <div className="Login_form">
                <h1>ⓉABIBITO</h1>
                <div className="Login_fields">
                    <form>
                        <input
                            type="text"
                            placeholder="enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />{' '}
                        <br />
                        <input
                            type="password"
                            placeholder="enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button type="submit" onClick={handleSubmit}>
                            Login
                        </button>
                        <p>
                            Don't have an account?{' '}
                            <span>
                                <a href="/register">Click here</a>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            <div className="Login_image">
                <img src={img} />
            </div>
        </div>
    )
}

export default Login
