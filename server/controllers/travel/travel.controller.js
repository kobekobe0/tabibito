const Travel = require('../../models/travel.model')
const path = require('path')

const getPublicTravels = async (req, res) => {
    const travels = await Travel.find({ private: false })
    res.json(travels)
}

const getTravelById = async (req, res) => {
    //use fs to send images from upload folder to client
    const travelId = req.params.id
    const travel = await Travel.findById(travelId)
    res.json(travel)
}

const createTravel = async (req, res) => {
    const travel = req.body
    console.log(req.files)
    const image = req.files
    let tempArr = []
    for (let i = 0; i < image.length; i++) {
        tempArr.push(image[i].path)
    }
    console.log(req.file)
    const newTravel = await Travel.create({
        ...travel,
        images: tempArr,
    })

    res.json({ message: 'success', newTravel })
}

const updateTravel = async (req, res) => {
    const travel = req.params.id
    const budget = req.body.budget
    if (budget) {
        const updatedTravel = await Travel.findByIdAndUpdate(travel, {
            $set: {
                budget: {
                    food: budget.food,
                    accommodation: budget.accommodation,
                    transportation: budget.transportation,
                    other: budget.other,
                },
            },
        })
    }
    const updatedTravel = await Travel.findByIdAndUpdate(travel, {
        $set: {
            title: req.body.title,
            location: req.body.location,
            description: req.body.description,
            private: req.body.private,
        },
    })
    res.json(updatedTravel)
}

const deleteTravel = async (req, res) => {
    const travelId = req.params.id

    //delete images in upload folder in the server
    await Travel.findById(travelId).then((travel) => {
        travel.images.forEach((image) => {
            fs.unlink(path.join(__dirname, image), (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })

    await Travel.findByIdAndDelete(travelId)
        .then((travel) => {
            res.json({
                message: 'successfully deleted',
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

const getUserTravels = async (req, res) => {
    //send images from the server to the client
    //using the identifier from travels
    //only send the first image, title, town, city, and country

    const userId = req.params.id
    const travels = await Travel.find({
        userId: userId,
    })
    //only return image and title
    res.json(travels)
}

module.exports = {
    getPublicTravels,
    getTravelById,
    createTravel,
    updateTravel,
    getUserTravels,
    deleteTravel,
}
