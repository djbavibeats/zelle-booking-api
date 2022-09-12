const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { URLSearchParams } = require('url')
const { v4: uuidv4 } = require('uuid')
const MongoClient = require('mongodb').MongoClient
const axios = require('axios')
// const mailchimp = require('@mailchimp/mailchimp_transactional')('3SaGF1PPdMZbnm70OPNwlQ');
const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require('md5')
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

// var users = require('../notes/users.json')
// var perks = require('../notes/perks.json')
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
        let email = req.query.email
        console.log(authCode, email)
        db.collection('users').findOne({ contactEmail: email, authCodeOne: authCode })
            .then(user => { 
                console.log('hey', user)
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
        let data = req.body

        // Check is PERK is sold out
        db.collection('perks').findOne({ perkName: data.perk.perkName })
            .then(perk => {
                if (perk.signups >= perk.maxSignups) {
                    console.log('this perk is full')
                    res.send({ 
                        'status': 400,
                        'message': 'this perk is full'
                    })
                } else {
                    console.log('this perk is not full')
                    db.collection('perks').findOneAndUpdate(
                        { perkName: perk.perkName },
                        {
                            $inc: { signups: 1 },
                            $push: { users: data.user }
                        }
                    )

                    db.collection('users').findOneAndUpdate(
                        { _id: ObjectId(data.user._id) },
                        {                         
                            $set: {
                                perkOne: data.user.perkOne,
                                hasPerkOne: data.user.hasPerkOne,
                                perkTwo: data.user.perkTwo,
                                hasPerkTwo: data.user.hasPerkTwo
                            }
                        }
                    )
                    res.send({
                        'status': 200,
                        'message': 'this perk is not full'
                    })
                }
            })
    })

    app.post('/create-user', (req, res) => {
        let userObject = req.body
        db.collection('users').insertOne({
            ...userObject
        })
            .then(response => { res.send({ 'message': response }) })
            .catch(error => { res.send({ 'error': error }) })
    })

    app.get('/users', (req, res) => {
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

// app.get('/test-mailchimp-transactional', (req, res) => {
//     async function callPing() {
//     const response = await mailchimp.users.ping();
//     console.log(response);
//     }

//     callPing();
// })

// app.get('/send-test-email', (req, res) => {
//     const message = {
//         from_email: 'bourbon@justinbavier.com',
//         subject: 'hello world',
//         text: 'welcome to mailchimp transactional',
//         to: [
//             {
//                 email: 'justin@justinbavier.com',
//                 type: 'to'
//             }
//         ]
//     }

//     async function run() {
//         const response = await mailchimp.messages.send({
//           message
//         });
//         console.log(response);
//       }
//       run();
// })

/**
 * MAILCHIMP API FUNCTIONS
 */
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_MARKETING_API_KEY,
    server: process.env.MAILCHIMP_MARKETING_SERVER_PREFIX
})

app.post('/update-mailchimp-tag', (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const tag = req.body.tag
    const listId = process.env.MAILCHIMP_LIST_ID
    const subscriberHash = md5(email.toLowerCase())

    const run = async () => {
        const response = await mailchimp.lists.updateListMemberTags(
            listId,
            subscriberHash,
            { tags: [{ name: tag, status: 'active' }] }
        )
    }

    run()
        .then(response => { 
            res.send({
                'status': 200,
                'message': 'Email updated'
            })
        })
        .catch(err => { 
            res.send({
                'status': 400,
                'message': 'Something went wrong!',
                'error': err
            })
        })
})


app.listen(process.env.PORT || 8080, (req, res) => console.log('running on 8080'))