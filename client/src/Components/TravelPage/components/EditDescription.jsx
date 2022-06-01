function EditDescription() {
    return (
        <>
            <section className="post-description">
                <div className="travelpage-info">
                    <div className="travel-header">
                        <div className="travel-title">
                            <h2>{data.title}</h2>
                            <h3>
                                {data.locationTown}, {data.locationCity},{' '}
                                {data.locationCountry}
                            </h3>
                            <div id="user-info">
                                <div className="pfp">
                                    <img
                                        src={
                                            userData.pfp &&
                                            `http://localhost:3000/${userData.pfp.replace(
                                                'pfp',
                                                ''
                                            )}`
                                        }
                                        alt=""
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </div>
                                <div className="texts">
                                    <h3
                                        id="username"
                                        onClick={() =>
                                            handleClickUser(data.userId)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {userData.name}
                                    </h3>
                                    <h4 id="date">{date}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="travel-like">
                            {own ? (
                                <AiOutlineEdit
                                    color="gold"
                                    size={30}
                                    onClick={() => setEdit(true)}
                                />
                            ) : (
                                <BsBookmark color="gold" size={30} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="description">
                    <pre>{data.description}</pre>
                </div>
                <div className="other-info">
                    <div className="other-info-left">
                        <h4>Budget</h4>
                        <div className="budgets">
                            <p>
                                Accomodation:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.accommodation
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Transportaion:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.transportation
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Food:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.food
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Other:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.other
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="other-info-right">
                        <h4>Transportation type</h4>
                        <p>{data.transportationType}</p>
                        <h4>Traveler's location</h4>
                        <p>
                            {data.travelerTown}, {data.travelerCity},{' '}
                            {data.travelerCountry}
                        </p>
                        <h4>Head count</h4>
                        <p>
                            <BsFillPeopleFill size={20} /> {data.travelerCount}{' '}
                            ={' '}
                            {(data.accommodation +
                                data.food +
                                data.other +
                                data.transportation) /
                                data.travelerCount}
                            {'/person'}
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditDescription
