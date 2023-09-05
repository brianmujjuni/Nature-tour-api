const express = require('express')
const router = express.Router()

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "success",
        msg: "Route under development"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: "success",
        msg: "Route under development"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "success",
        msg: "Route under development"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: "success",
        msg: "Route under development"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "success",
        msg: "Route under development"
    })
}


router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router