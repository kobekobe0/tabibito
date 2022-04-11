import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post('http://localhost:3000/api/users/login', {
            email: email,
            password: password,
        })
    }

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
