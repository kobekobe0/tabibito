import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdOutlineSearch } from 'react-icons/md'
import './Search.css'
import Navbar from '../Navbar/Navbar'

function Search() {
    const [query, setQuery] = useState('')
    const [usersResult, setUsersResult] = useState([])
    const [travelsResult, setTravelsResult] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setTravelsResult([])
        setUsersResult([])
        setQuery('')
        setSearchQuery('')

        if (query.length >= 3) {
            console.log(query)
            return axios
                .get(`/search?search=${query}`)
                .then((res) => {
                    console.log(res.data)
                    setTravelsResult(res.travels)
                    setUsersResult(res.users)
                    setSearchQuery(query)
                })
                .catch((e) => {
                    console.log(e)
                    setError(true)
                })
        }
        return alert('please enter 3 letters')
    }
    return (
        <>
            {' '}
            <div className="search-page">
                <main>
                    <div className="searchBox">
                        <form onsubmit="event.preventDefault();" role="search">
                            <label for="search">Search for stuff</label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Search..."
                                autofocus
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
                    <div>
                        {searchQuery !== '' ? (
                            <p>Search results for: {searchQuery}</p>
                        ) : null}
                    </div>
                </main>
            </div>
            <Navbar />
        </>
    )
}

export default Search
