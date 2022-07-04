import { Link } from 'react-router-dom'
import { MdPublic, MdOutlineSearch, MdMessage } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'

function Navbar() {
    return (
        <section>
            <div className="navbar">
                <div className="navbar-items">
                    <div className="navbar-item">
                        <Link to="/">
                            <AiFillHome size={40} color="lightblue" />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/public">
                            <MdPublic size={40} color="white" />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/message">
                            <MdMessage size={40} color="white" />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/search">
                            <MdOutlineSearch size={40} color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar
