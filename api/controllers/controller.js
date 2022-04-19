const User = require('../models/model')

async function getAll(req, res) {
    try{
        const userData = await User.all; 
        res.status(200).json(userData)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function getUser(req, res) {
    try{
        const username = req.params.username
        const user = await User.findByUser(username)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function createNewUser(req, res) {
    try{
        const username = req.body.username
        const user = await User.createUser(username)
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function updateScore(req, res) {
    try{
        const username = req.params.username
        const score = req.body.score
        const user = await User.updateUserScore(username, score)
        res.status(200).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}


module.exports = { getAll, createNewUser, getUser, updateScore }