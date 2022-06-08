import './App.css'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home'
import Modal from './Components/Modal/Modal'
import './Components/Home/navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import TravelPage from './Components/TravelPage/TravelPage'
import { MdPublic } from 'react-icons/md'
import PublicFeed from './Components/Feed/PublicFeed'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/post" element={<Modal />} />
                        <Route
                            exact
                            path="/travel/:id"
                            element={<TravelPage />}
                        />
                        <Route exact path="/profile/:id" element={<Home />} />
                        <Route exact path="/public" element={<PublicFeed />} />
                        <Route exact path="/" element={<Home />} />
                    </Routes>
                    <section>
                        <div className="navbar">
                            <div className="navbar-items">
                                <div className="navbar-item">
                                    <Link to="/">
                                        <MdPublic size={50} />
                                    </Link>
                                </div>
                                <div className="navbar-item">
                                    <Link to="/public">Public</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App
