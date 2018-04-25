const express = require('express')
var route = express.Router()

const Result = require('../Models/FaceRecog')


route.post('/facerec/', (req, res)=> {
    Result.makePrediction(imagefrombutterbot)
    res.send(Result)
})


module.exports = route