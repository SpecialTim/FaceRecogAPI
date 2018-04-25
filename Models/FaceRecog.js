const path = require('path')
const fs = require('fs')
const cv = require('opencv4nodejs')
const fr = require('face-recognition').withCv(cv)

const recognizer = fr.FaceRecognizer()
const trainedModelFile = 'FullModel.json'
const trainedModelFilePath = path.resolve('../Data', trainedModelFile)

recognizer.load(require(trainedModelFilePath))

function makePrediction(imagefrombutterbot){

    const prediction = recognizer.predictBest(imagefrombutterbot)
    console.log(prediction.className)
}
module.exports.makePrediction = () => {
    return prediction
}