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
import Search from './Components/Search/Search'
import VerifyPage from './Components/Verify/VerifyPage'
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
                        <Route exact path="/search" element={<Search />} />
                        <Route
                            exact
                            path="/verify/:ticketId"
                            element={<VerifyPage />}
                        />
                        <Route exact path="/" element={<Home />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App
