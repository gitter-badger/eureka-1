
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

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

var Object = new Objects({
    user_id: mongoose.Types.ObjectId('5bdda7f6bfa700c5a07f72ba'),
    name: 'mobile',
    status: 'NOTHING'
})

Object.save(function(error) {
    if (error) { 
        console.log(error) 
    } else {
        console.log('saved')
    }
})
