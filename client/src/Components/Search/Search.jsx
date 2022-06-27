import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdOutlineSearch } from 'react-icons/md'
import './Search.css'
import Travels from './Components/Travels'
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

    const [hasMoreUsers, setHasMoreUsers] = useState(false)
    const [hasMoreTravels, setHasMoreTravels] = useState(false)

    const [hasMoreUsersLoading, setHasMoreUsersLoading] = useState(false)
    const [hasMoreTravelsLoading, setHasMoreTravelsLoading] = useState(false)

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
        setHasMoreUsers(false)
        setHasMoreTravels(false)

        //make url serach?search=query then extract it and pass it to the api

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
                    setHasMoreTravels(res.data.travelCountExceeded)
                    setHasMoreUsers(res.data.userCountExceeded)
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

    const searchMoreUsers = () => {
        setHasMoreUsersLoading(true)
        setHasMoreUsers(false)
        axios
            .get(`/search/user?search=${searchQuery}`)
            .then((res) => {
                setUsersResult(usersResult.concat(res.data))
                //I can add exceeded boolean value then just send skip param in FE rather than hard coding it on Server when querying for pagination

                setHasMoreUsersLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setHasMoreUsersLoading(false)
            })
    }

    const searchMoreTravels = () => {
        setHasMoreTravelsLoading(true)
        setHasMoreTravels(false)
        axios
            .get(`/search/travel?search=${searchQuery}`)
            .then((res) => {
                setTravelsResult(travelsResult.concat(res.data))
                setHasMoreTravelsLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setHasMoreTravelsLoading(false)
            })
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
                                        {hasMoreUsers ? (
                                            <a
                                                onClick={searchMoreUsers}
                                                style={{
                                                    margin: '0',
                                                    marginBottom: '1em',
                                                    cursor: 'pointer',
                                                    color: '#fff',
                                                }}
                                            >
                                                see more
                                            </a>
                                        ) : null}
                                        {hasMoreUsersLoading ? (
                                            <div className="lds-ring">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                                {showTravels ? (
                                    <div className="travels-items">
                                        <div className="travels-items-header">
                                            <h3>Travels</h3>
                                        </div>
                                        <ul className="travels-results">
                                            {travelsResult.map((travel) => (
                                                <li>
                                                    <Travels
                                                        img={travel.images[0]}
                                                        userId={travel.userId}
                                                        town={
                                                            travel.locationTown
                                                        }
                                                        city={
                                                            travel.locationCity
                                                        }
                                                        title={travel.title}
                                                        id={travel._id}
                                                    />
                                                </li>
                                            ))}
                                            {hasMoreTravels ? (
                                                <a
                                                    onClick={searchMoreTravels}
                                                    style={{
                                                        margin: '0',
                                                        marginTop: '10px',
                                                        cursor: 'pointer',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    see more
                                                </a>
                                            ) : null}
                                            {hasMoreTravelsLoading ? (
                                                <div className="lds-ring">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            ) : null}
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
