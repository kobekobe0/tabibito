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

        const data = await axios
            .post('users/login', {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.data.isVerified == true) {
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    window.location.href = '/'
                } else if (res.data.isVerified == false) {
                    window.location.href = `/verify/${res.data.ticketId}`
                } else {
                    alert('Invalid email or password') //placeholder
                }
            })
    }

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode jwt token
            let user = jwt_decode(token)
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
