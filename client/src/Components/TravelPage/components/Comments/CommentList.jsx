function CommentList({ pfp }) {
    return (
        <div className="comment-list">
            <ul>
                <li className="comment-single">
                    <div className="comment-single-wrapper">
                        <div className="comment-single-texts">
                            <img
                                src={
                                    pfp &&
                                    `http://localhost:3000/${pfp.replace(
                                        'pfp',
                                        ''
                                    )}`
                                }
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                            <div className="comment-single-top">
                                <div className="comment-single-top-texts">
                                    <h4>DummyName</h4>
                                    <h5>1hr ago</h5>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer
                                    adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa. Cum sociis natoque
                                    penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. Donec quam felis,
                                    ultricies nec, pellentesque eu, pretium
                                    quis, sem. Nulla consequat massa quis enim.
                                    Donec.
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CommentList
