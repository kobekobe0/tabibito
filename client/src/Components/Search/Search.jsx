import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdOutlineSearch } from 'react-icons/md'
import './Search.css'
import Navbar from '../Navbar/Navbar'
import jwt_decode from 'jwt-decode'

function Search() {
    const [query, setQuery] = useState('')
    const [usersResult, setUsersResult] = useState([])
    const [travelsResult, setTravelsResult] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState(false)

    const [showUsers, setShowUsers] = useState(false)
    const [showTravels, setShowTravels] = useState(false)

    const [loading, setLoading] = useState(false)
    const [noResults, setNoResults] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTravelsResult([])
        setUsersResult([])
        setQuery('')
        setSearchQuery('')
        setShowTravels(false)
        setShowUsers(false)
        setNoResults(false)

        if (query.length >= 3) {
            console.log(query)
            return axios
                .get(`/search?search=${query}`)
                .then((res) => {
                    console.log(res.data)
                    setTravelsResult(res.data.travels)
                    setUsersResult(res.data.users)
                    setSearchQuery(query)
                    setLoading(false)
                    if (res?.data.travels?.length !== 0) setShowTravels(true)
                    if (res?.data.users?.length !== 0) setShowUsers(true)
                    if (
                        res.data.users.length == 0 &&
                        res.data.travels.length == 0
                    )
                        setNoResults(true)
                })
                .catch((e) => {
                    console.log(e)
                    setLoading(false)
                    setError(true)
                })
        } else {
            setLoading(false)
            return alert('please enter 3 letters')
        }
    }

    const vistiProfile = (id) => {
        const userToken = window.localStorage.getItem('user')
        const userData = jwt_decode(userToken)
        const userId = userData.id

        if (userId === id) {
            return (window.location.href = `/`)
        }
        return (window.location.href = `/profile/${id}`)
    }

    return (
        <>
            {' '}
            <div className="search-page">
                <main>
                    <div className="searchBox">
                        <form role="search">
                            <label for="search">Search for stuff</label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Search..."
                                autoFocus
                                required
                                minLength={3}
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />
                            <button type="submit" onClick={handleSubmit}>
                                Go
                            </button>
                        </form>
                    </div>
                    <div className="search-results">
                        <div className="search-text">
                            {searchQuery !== '' ? (
                                <p>
                                    Search results for:{' '}
                                    <span style={{ fontWeight: 'bold' }}>
                                        {searchQuery}
                                    </span>
                                </p>
                            ) : null}
                        </div>
                        {noResults && <p>No result</p>}
                        {loading ? (
                            <div className="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <div className="search-items">
                                {showUsers ? (
                                    <div className="users-item">
                                        <div className="users-items-header">
                                            <h3>Users</h3>
                                        </div>
                                        <ul className="users-results">
                                            {usersResult.map((user, index) => (
                                                <li>
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            vistiProfile(
                                                                user._id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={`http://localhost:3000/${user.pfp.replace(
                                                                'pfp',
                                                                ''
                                                            )}`}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                            }}
                                                        />
                                                        <h4>{user.name}</h4>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                                {showTravels ? (
                                    <div className="travels-item">
                                        <div className="travels-items-header">
                                            <h3>Travels</h3>
                                        </div>
                                        <ul>
                                            {travelsResult.map((travel) => (
                                                <div
                                                    className="travels-results"
                                                    key={travel._id}
                                                ></div>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Navbar />
        </>
    )
}

export default Search
