const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { URLSearchParams } = require('url')
const { v4: uuidv4 } = require('uuid')
const MongoClient = require('mongodb').MongoClient
const axios = require('axios')
require('dotenv').config()

const path = __dirname + '/../public'
const app = express()
// app.use(express.static(path))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')
const MONGODB_STRING = process.env.MONGODB_STRING

// app.get('/', (req, res) => {
//     res.send({
//         'message': 'Welcome to the Zelle x Bourbon and Beyond Booking API'
//     })
// })

var users = require('./users.json')
var perks = require('./perks.json')
const { ObjectId } = require('bson')

app.get('/admin', (req, res) => {
    res.render('admin')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/admin-auth', (req, res) => {
    console.log(req.body)
    if (req.body.username === process.env.ADMIN_USER && req.body.password === process.env.ADMIN_PASSWORD) {
        console.log('success')
        res.send({
            'status': 200,
            'message': 'Authenticated.'
        })
    } else {
        res.send({
            'status': 400,
            'message': 'Incorrect credentials.'
        })
    }
})


MongoClient.connect(MONGODB_STRING, function (err, client) {
    if (err) throw err

    var db = client.db('booking')

    console.log('connected to MongoDB')

    app.get('/list-users', (req, res) => {
        db.collection('users').find().toArray(function (err, result) {
            if (err) throw err

            console.log(result)
            res.send({
                'users': result
            })
        })
    })
    
    app.get('/check-auth', (req, res) => {
        let authCode = req.query.authCode

        db.collection('users').findOne({ authCodeOne: authCode })
            .then(user => { 
                if (user) {
                    res.send({ 'status': 200, 'message': 'User found.', 'user': user, 'authCode': 1 })
                } else {
                    db.collection('users').findOne({ authCodeTwo: authCode })
                        .then(user => {
                            if (user) {
                                res.send({ 'status': 200, 'message': 'User found. Auth code two.', 'user': user, 'authCode': 2 })
                            } else {
                                res.send({ 'status': 404, 'message': 'Incorrect credentials or user does not exist.'})
                            }
                        })
                }
            })
            .catch(error => { res.send({ 'status': 400, 'error': error })})
    })

    app.post('/set-perk', (req, res) => {
        let user = req.body
        console.log(user)
        // Check is PERK is sold out
        // db.collection('perks').findOne({ perkName: user.perk })
        //     .then(perk => {
        //         console.log(perk)
        //         if (perk.signups >= perk.maxSignups) {
        //             res.send({ 'message': 'This perk is full' })
        //         } else {
        //             db.collection('perks').findOneAndUpdate(
        //                 { perkName: user.perk }, 
        //                 { 
        //                     $inc: { signups: perk.signups += 1 },
        //                     $push: { users: user }
        //                 })
                    
        //             db.collection('users').findOneAndUpdate(
        //                 { _id: ObjectId(user._id) },
        //                 {
        //                     $set: { 
        //                         perk: user.perk,
        //                         hasPerk: true 
        //                     }
        //                 }
        //             )
        //             res.send({ 'message': 'This perk is not full' })
        //         }
        //     })
        //     .catch(error => { res.send({ 'status': 500, 'error': error }) })
            // Send error if YES

            // Update USER with perk confirmation if NO

            // Update PERK count
    })

    app.post('/create-user', (req, res) => {
        let userObject = req.body
        db.collection('users').insertOne({
            ...userObject
        })
            .then(response => { res.send({ 'message': response }) })
            .catch(error => { res.send({ 'error': error }) })
    })

    app.get('/test-users', (req, res) => {
        var array = users
        var interval = 1000
        var promise = Promise.resolve()
        var count = 0
        array.forEach(function (user) {
        promise = promise.then(function () {
            count++
            axios.post('http://localhost:8080/create-user', { ...user })
                .then(response => { console.log(count, response.data) })
                .catch(error => { console.log(error) })
            return new Promise(function (resolve) { setTimeout(resolve, interval) })
        })
        })
    })

    app.get('/list-perks', (req, res) => {
        db.collection('perks').find().toArray(function (err, result) {
            if (err) throw err

            // console.log(result)
            res.send({
                'perks': result
            })
        })
    })

    app.post('/create-perk', (req, res) => {
        let perkObject = req.body
        console.log(perkObject)
        db.collection('perks').insertOne({
            ...perkObject
        })
            .then(response => { res.send({ 'message': response }) })
            .catch(error => { res.send({ 'error': error }) })
    })

    app.get('/update-perks', (req, res) => {
        for (const perk of perks) {
            axios.post('http://localhost:8080/create-perk', { ...perk })
                .then(response => { res.send({ 'message': response }) })
                .catch(error => { res.send({ 'message': error }) })
        }   
    })
})





app.listen(process.env.PORT || 8080, (req, res) => console.log('running on 8080'))