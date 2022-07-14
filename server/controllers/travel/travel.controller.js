const Travel = require('../../models/travel.model')
const Userdata = require('../../models/register.model')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const getPublicTravels = async (req, res) => {
    //?page=2&limit=3
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let results = {}

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        }
    }
    if (
        endIndex <
        (await Travel.countDocuments({
            //public === false
            //private === true
            private: false,
        }))
    ) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    let lengthTravel =
        (await Travel.countDocuments({
            private: false,
            deleted: false,
        })) / limit

    results.lengthData = Math.ceil(lengthTravel)

    results.result = await Travel.find({ private: false })
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 })

    return res.json(results)
}

const getFollowingTravels = async (req, res) => {
    //?page=2&limit=3
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    // travel/following/:id?page=2&limit=3
    const user = await Userdata.findById(req.params.id)
    const followings = user.following

    let results = {}

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        }
    }
    if (
        endIndex <
        (await Travel.countDocuments({
            //public === false
            //private === true
            private: false,
            userId: { $in: followings },
        }))
    ) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    let lengthTravel =
        (await Travel.countDocuments({
            private: false,
            deleted: false,
        })) / limit

    results.lengthData = Math.ceil(lengthTravel)

    results.result = await Travel.find({
        private: false,
        userId: { $in: followings },
    })
        .limit(limit)
        .skip(startIndex)
        .sort({ createdAt: -1 })

    return res.json(results)
}

const getFollowedTravels = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await Userdata.findById(userId)
        const travels = await Travel.find({
            _id: { $in: user.following },
        }).sort({ createdAt: -1 })
        res.json(travels)
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const getTravelById = async (req, res) => {
    //use fs to send images from upload folder to client
    const travelId = req.params.id
    try {
        const travel = await Travel.findById(travelId)
        res.json(travel)
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id

    try {
        const user = await Userdata.findById(userId)
        if (user) {
            res.json(user)
        } else {
            res.json({ message: 'user not found', status: 404 })
        }
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const createTravel = async (req, res) => {
    const travel = req.body
    const image = req.files
    try {
        if (
            travel.title.length > 18 &&
            !travel.food &&
            !travel.accommodation &&
            !travel.transportation &&
            !travel.other &&
            !travel.locationCountry &&
            !travel.locationCity &&
            !travel.locationTown &&
            !travel.transportationType &&
            !travel.travelerCountry &&
            !travel.travelerCity &&
            !travel.travelerTown &&
            travel.description.length > 2000 &&
            travel.likes.length === 0 &&
            travel.saves.length === 0
        ) {
            res.json({
                message: 'error',
                status: 400,
            })
        } else {
            let tempArr = []
            for (let i = 0; i < image.length; i++) {
                tempArr.push(image[i].path)
            }
            const newTravel = await Travel.create({
                ...travel,
                images: tempArr,
            })

            res.json({ message: 'success', status: 200, newTravel })
        }
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const follow = async (req, res) => {
    const follower = req.body.follower
    const following = req.body.following
    const method = req.body.method
    const fr = await Userdata.findById(follower)
    const fg = await Userdata.findById(following)

    try {
        if (fr && fg) {
            if (method === 'follow') {
                if (fr.following.includes(following)) {
                    res.json({
                        message: 'already following',
                    })
                } else {
                    fr.following.push(following)
                    fg.followers.push(follower)
                    fr.save()
                    fg.save()
                    res.json({
                        message: 'following',
                        status: 200,
                    })
                }
            } else if (method === 'unfollow') {
                if (!fr.following.includes(following)) {
                    res.json({
                        message: 'not following',
                    })
                } else {
                    fr.following.splice(fr.following.indexOf(following), 1)
                    fg.followers.splice(fg.followers.indexOf(follower), 1)
                    fr.save()
                    fg.save()
                    res.json({
                        message: 'unfollowing',
                        status: 200,
                    })
                }
            }
        }
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const user = req.body

    try {
        let pfpToUpload = ''
        let bgToUpload = ''
        if (req.files !== {}) {
            if (req.files.backgroundUpload) {
                bgToUpload = req.files.backgroundUpload[0].path
            } else {
                bgToUpload = user.background
            }
            if (req.files.profileUpload) {
                pfpToUpload = req.files.profileUpload[0].path
            } else {
                pfpToUpload = user.pfp
            }
        }

        await Userdata.findByIdAndUpdate(userId, {
            $set: {
                ...user,
                background: bgToUpload,
                pfp: pfpToUpload,
            },
        })

        const dataUser = await Userdata.findById(userId)

        const token = jwt.sign(
            {
                name: dataUser.name,
                email: dataUser.email,
                id: dataUser._id,
                pfp: dataUser.pfp,
                background: dataUser.background,
                bio: dataUser.bio,
                saves: dataUser.saves,
                following: dataUser.following,
                followers: dataUser.followers,
            },
            'secretkey'
        )
        res.json(token)
    } catch (err) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const likeTravel = async (req, res) => {
    const travelId = req.params.id
    const userId = req.body.userId
    const method = req.body.method
    const user = await Userdata.findById(userId)
    const travel = await Travel.findById(travelId)

    try {
        if (user) {
            if (travel) {
                if (method === 'like') {
                    if (user.likes.includes(travelId)) {
                        res.json({
                            message: 'already liked',
                        })
                    } else {
                        user.likes.push(travelId)
                        user.save()
                        travel.likes.push(userId)
                        travel.save()
                        res.json({
                            message: 'success',
                        })
                    }
                } else if (method === 'unlike') {
                    if (!user.likes.includes(travelId)) {
                        res.json({
                            message: 'not liked',
                        })
                    } else {
                        user.likes.pull(travelId)
                        user.save()
                        travel.likes.pull(userId)
                        travel.save()
                        res.json({
                            message: 'success',
                        })
                    }
                }
            } else {
                res.json({
                    message: 'travel not found',
                    status: 404,
                })
            }
        } else {
            res.json({
                message: 'Invalid user ID',
                status: 404,
            })
        }
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const saveTravel = async (req, res) => {
    const travelId = req.params.id
    const userId = req.body.userId
    const method = req.body.method
    const user = await Userdata.findById(userId)
    const travel = await Travel.findById(travelId)

    try {
        if (user) {
            if (travel) {
                if (method === 'save') {
                    if (user.saves.includes(travelId)) {
                        res.json({
                            message: 'already saved',
                        })
                    } else {
                        user.saves.push(travelId)
                        user.save()
                        travel.saves.push(userId)
                        travel.save()
                        res.json({
                            message: 'success',
                        })
                    }
                } else if (method === 'unsave') {
                    if (!user.saves.includes(travelId)) {
                        res.json({
                            message: 'not saved',
                        })
                    } else {
                        user.saves.pull(travelId)
                        user.save()
                        travel.saves.pull(userId)
                        travel.save()
                        res.json({
                            message: 'success',
                        })
                    }
                }
            } else {
                res.json({
                    message: 'travel not found',
                    status: 404,
                })
            }
        } else {
            res.json({
                message: 'Invalid user ID',
                status: 404,
            })
        }
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const deleteTravel = async (req, res) => {
    const travelId = req.params.id

    try {
        await Travel.findByIdAndUpdate(travelId, {
            $set: {
                deleted: true,
            },
        })
        res.json({
            message: 'successfully deleted',
            status: 200,
        })
    } catch (err) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const updateTravel = async (req, res) => {
    const travel = req.params.id
    const {
        title,
        description,
        locationTown,
        locationCity,
        locationCountry,
        accommodation,
        transportation,
        food,
        other,
        transportationType,
        travelerTown,
        travelerCity,
        travelerCountry,
        travelerCount,
    } = req.body

    if (
        title.length > 18 &&
        !food &&
        !accommodation &&
        !transportation &&
        !other &&
        !locationCountry &&
        !locationCity &&
        !locationTown &&
        !transportationType &&
        !travelerCountry &&
        !travelerCity &&
        !travelerTown &&
        description.length > 2000
    ) {
        res.json({
            message: 'error',
            status: 404,
        })
    } else {
        try {
            const updatedTravel = await Travel.findByIdAndUpdate(travel, {
                $set: {
                    title: title,
                    description: description,
                    locationTown: locationTown,
                    locationCity: locationCity,
                    locationCountry: locationCountry,
                    accommodation: accommodation,
                    transportation: transportation,
                    food: food,
                    other: other,
                    transportationType: transportationType,
                    travelerTown: travelerTown,
                    travelerCity: travelerCity,
                    travelerCountry: travelerCountry,
                    travelerCount: travelerCount,
                },
            })
            res.json(updatedTravel)
        } catch (err) {
            res.json({
                message: 'error',
                status: 404,
            })
        }
    }
}

const getUserTravels = async (req, res) => {
    //send images from the server to the client
    //using the identifier from travels
    //only send the first image, title, town, city, and country

    const userId = req.params.id
    //only return fields of locationTown and locationCity
    try {
        const travels = await Travel.find({
            userId: userId,
            deleted: false,
        }).sort({ createdAt: -1 })
        //only return image and title
        res.json(travels)
    } catch (err) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}

const getPreviewImage = async (req, res) => {
    const PATH = path.join(__dirname, `../../${req.body.image}`)
    res.download(PATH)
}

const LIMIT = 5

const searchMoreUser = async (req, res) => {
    const search = req.query.search
    const users = await Userdata.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ],
    })
        .sort({ followers: -1 })
        .skip(LIMIT)
    res.json(users)
}

const searchMoreTravel = async (req, res) => {
    const search = req.query.search
    const travels = await Travel.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { locationCountry: { $regex: search, $options: 'i' } },
            { locationCity: { $regex: search, $options: 'i' } },
            { locationTown: { $regex: search, $options: 'i' } },
        ],
        deleted: false,
        private: false,
    })
        .sort({ createdAt: -1, likes: -1 })
        .skip(LIMIT)
    res.json(travels)
}

const searchAnything = async (req, res) => {
    const search = req.query.search.trim()

    try {
        if (search.length >= 3) {
            try {
                const users = await Userdata.find({
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                    ],
                })
                    .sort({ followers: -1 })
                    .limit(LIMIT)

                let userCountExceeded = false
                if (
                    (await Userdata.countDocuments({
                        $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } },
                        ],
                    })) > LIMIT
                ) {
                    userCountExceeded = true
                }

                const travels = await Travel.find({
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { locationCountry: { $regex: search, $options: 'i' } },
                        { locationCity: { $regex: search, $options: 'i' } },
                        { locationTown: { $regex: search, $options: 'i' } },
                    ],
                    deleted: false,
                    private: false,
                })
                    .sort({ createdAt: -1, likes: -1 })
                    .limit(LIMIT)

                let travelCountExceeded = false
                if (
                    (await Travel.countDocuments({
                        $or: [
                            { title: { $regex: search, $options: 'i' } },
                            { description: { $regex: search, $options: 'i' } },
                            {
                                locationCountry: {
                                    $regex: search,
                                    $options: 'i',
                                },
                            },
                            { locationCity: { $regex: search, $options: 'i' } },
                            { locationTown: { $regex: search, $options: 'i' } },
                        ],
                        deleted: false,
                        private: false,
                    })) > LIMIT
                ) {
                    travelCountExceeded = true
                }
                const responseData = {
                    searchText: search,
                    users: users,
                    travels: travels,
                    userCountExceeded: userCountExceeded,
                    travelCountExceeded: travelCountExceeded,
                }
                return res.json(responseData)
            } catch (error) {
                return res.json({
                    message: 'server error',
                    status: 404,
                })
            }
        }

        return res.json({
            message: 'Enter atleast 3 characters',
            status: 404,
        })
    } catch (error) {
        res.json({
            message: 'error',
            status: 404,
        })
    }
}
//search
//"$or": [{ locationTown: $regex:req.params.param }, { "locationCity": "London" }]
module.exports = {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
    deleteTravel,
    getPreviewImage,
    updateUser,
    getUserById,
    likeTravel,
    saveTravel,
    follow,
    getFollowedTravels,
    searchAnything,
    searchMoreUser,
    searchMoreTravel,
    getFollowingTravels,
}
