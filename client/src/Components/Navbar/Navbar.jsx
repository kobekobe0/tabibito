import { Link } from 'react-router-dom'
import { MdPublic, MdOutlineSearch, MdMessage } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'

function Navbar() {
    return (
        <section>
            <div className="navbar">
                <div className="navbar-items">
                    <div className="navbar-item">
                        <Link to="/">
                            <AiFillHome
                                size="1.5em"
                                color="rgb(242, 242, 242)"
                            />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/public">
                            <MdPublic size="1.5em" color="rgb(242, 242, 242)" />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/following">
                            <BsFillPeopleFill
                                size="1.5em"
                                color="rgb(242, 242, 242)"
                            />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/message">
                            <MdMessage
                                size="1.5em"
                                color="rgb(242, 242, 242)"
                            />
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/search">
                            <MdOutlineSearch size="1.5em" color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar
