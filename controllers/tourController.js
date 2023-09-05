const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

//function to get all tours
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {

    const id = req.params.id * 1

    if (id > tours.length) {
        return res.status(404).json({
            status: "fail",
            msg: "Invalid Id"
        })
    }
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            msg: "No tour found"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })

}

exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "Fail",
            msg: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: "Update tour here"
        }
    })
}
exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "Fail",
            msg: "Invalid Id"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    })
}