import List from './List'
import './follows.css'
import { VscClose } from 'react-icons/vsc'
function FollowModal({ ids, closeModal, type }) {
    return (
        <div className="followsModal">
            <div className="follows-container">
                <div className="header">
                    <h2>{type}</h2>
                    <VscClose size={30} color="tomato" onClick={closeModal} />
                </div>

                <ul className="follows-list">
                    {ids.map((id) => (
                        <List key={id} id={id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FollowModal
