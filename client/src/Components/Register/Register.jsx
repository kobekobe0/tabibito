import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await axios.post(
            'http://localhost:3000/api/users/register',
            {
                name: name,
                email: email,
                password: password,
            }
        )

        console.log(res.data)
    }
    return (
        <div>
            <h1>Register</h1>
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="enter your name"
                        onChange={(e) => setName(e.target.value)}
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
                    <button type="submit" onClick={handleSubmit}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
