import List from './List'
import './follows.css'
function FollowModal({ ids, closeModal, type }) {
    return (
        <div className="followsModal">
            <div className="follows-container">
                <div className="header">
                    <h2>{type}</h2>
                    <button onClick={closeModal}>Close</button>
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
