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
    console.log('userID', userId)
    const user = await Userdata.findById(userId)
    if (user) {
        res.json(user)
    } else {
        res.json({ message: 'user not found' })
    }
}

const createTravel = async (req, res) => {
    const travel = req.body
    const image = req.files
    try {
        console.log(travel)
        console.log('VALIDATION' + travel.likes.length === 0)
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
            console.log('CREATE TRAVEL ERROR')
            res.json({
                message: 'error',
                status: 400,
            })
        } else {
            let tempArr = []
            for (let i = 0; i < image.length; i++) {
                tempArr.push(image[i].path)
            }
            console.log(req.file)
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
                    console.log('already following')
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
                    console.log('not following')
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
    console.log(req.files)
    console.log(user)

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
        console.log(token)
        res.json(token)
    } catch (err) {
        console.log(err)
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
                        console.log('already liked')
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
                        console.log('not liked')
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
                        console.log('already saved')
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
                        console.log('not saved')
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
        console.log(err)
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
    const travels = await Travel.find({
        userId: userId,
        deleted: false,
    }).sort({ createdAt: -1 })
    //only return image and title
    res.json(travels)
}

const getPreviewImage = async (req, res) => {
    const PATH = path.join(__dirname, `../../${req.body.image}`)
    console.log(req.body)
    res.download(PATH)
}

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
}
