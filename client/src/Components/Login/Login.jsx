import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await axios.post('http://localhost:3000/api/users/login', {
            email: email,
            password: password,
        })

        if (data.data.user) {
            localStorage.setItem('user', JSON.stringify(data.data.user))
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
        <div>
            <h1>Login</h1>
            <form action="">
                <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login
