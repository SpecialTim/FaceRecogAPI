var express = require('express')
var app = express()
const PORT = process.env.PORT || 5000
const bodyparser = require('body-parser')



app.use(express.static(__dirname + '/client/'))



app.get('/', (req, res) =>{
    res.render('Waiting for picture')
})

app.use('/recognition', require('./routes/api'))

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`)
})
