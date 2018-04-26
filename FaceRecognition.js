const path = require('path')
const fs  = require('fs')
const cv = require('opencv4nodejs')
const fr = require('face-recognition').withCv(cv)

const express = require('express')
const app = express()
const server =  require('http').Server(app)
const io = require('socket.io')(server, [])

const recognizer = fr.FaceRecognizer()
const trainedModelFile = 'FullModel.json'
const trainedModelFilePath = path.resolve('./Data', trainedModelFile)

recognizer.load(require(trainedModelFilePath))

function makePrediction(imageFromButterBot){
    return recognizer.predictBest(imageFromButterBot)
}

app.get('/', (req, res) => {
    res.send('Connected')
})

server.listen(5000)
console.log('server is listening on port 5000')

io.sockets.on('connection', (socket) => {
    console.log('Connection Established')
    socket.on('recognizeFace', (imgStr) => {
        console.log('recognize face')
        if(fs.exists('image.png')){
            fs.unlink('image.png', (err) => {
                if(err) throw err
                getImageSendResult(socket, imgStr)
            })
        } else {
            getImageSendResult(socket, imgStr)
        }
    })
})

const getImageSendResult = (socket, imgStr) => {
    fs.writeFile('image.png', imgStr, {encoding: 'base64'}, (err) => {
        console.log('Prediction Time...')
        let img = fr.loadImage('image.png')
        let prediction = makePrediction(img)
        socket.emit('predictionMade', prediction)
    })
}