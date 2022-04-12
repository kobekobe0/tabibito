import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

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
            } else {
                //fetch data
            }
        }
    }, [])
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
