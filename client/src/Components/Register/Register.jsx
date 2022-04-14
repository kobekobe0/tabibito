import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import './register.css'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [consfirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name) return alert('Name is required')
        if (!email) return alert('Email is required')
        if (!password) return alert('Password is required')

        if (password !== consfirmPassword) {
            alert('Passwords do not match')
            return
        }

        const res = await axios.post(
            'http://localhost:3000/api/users/register',
            {
                name: name,
                email: email,
                password: password,
            }
        )

        console.log(res)
        if (res.statusText === 'OK') {
            window.location.href = '/login'
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
        <div className="register_page">
            <div className="register_form">
                <h1>Register</h1>
                <div className="register_fields">
                    <form>
                        <input
                            type="text"
                            placeholder="enter your name"
                            onChange={(e) => setName(e.target.value)}
                            maxLength="15"
                        />{' '}
                        <br />
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
                        <input
                            type="password"
                            placeholder="enter your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <div className="register_image">
                <img src="../../images/register.jpg" />
            </div>
        </div>
    )
}

export default Register
