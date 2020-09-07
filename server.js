const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')

// Make sure you play body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'))

app.use(bodyParser.json())

app.listen(3000, function() {
  console.log('listening on 3000')
})

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})*/

/*
app.post('/quotes', (req, res) => {
  console.log(req.body)
})*/

app.put('/quotes', (req, res) => {
       console.log(req.body)
})  

console.log('May Node be with you')


const connectionString = 'mongodb+srv://yoda:Ken1989!@cluster0.gnqzc.mongodb.net/test?retryWrites=true&w=majority'

/*
MongoClient.connect(connectionString,{
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})*/

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('stars-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
       .then(result => {
         res.redirect('/')
       })
       .catch(error => console.error(error))
    })
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
       .then(results => {
         //console.log(results)
         res.render('index.ejs', { quotes: results })
       })
       .catch(error => console.error(error))
    })

  })
  .catch(error => console.error(error))

