const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(cors())

app.use( bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/findme', function(err) {
  if (err) { throw err }
})

const objectSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: String,
    status: String
})

const Objects = mongoose.model('objects', objectSchema);

app.get('/codes', (req, res) => {
    const userId = req.query.user_id

    if (!userId) {
        res.status(400).send()
    } else {
        // @TODO get all objects for this user
        Objects.find({user_id: userId}, function (err, objects) {
            if (err) res.status(500).send({error: err})
            
            res.send(objects)
        })
    }
})

app.post('/codes', (req, res) => {

    var Object = new Objects({
        user_id: mongoose.Types.ObjectId(req.body.user_id),
        name: req.body.name,
        status: 'NOTHING'
    })
    
    Object.save(function(err) {
        if (err) { 
            res.status(500).send({error: err})
        } else {
            res.send()
        }
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
