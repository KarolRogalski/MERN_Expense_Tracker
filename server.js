const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

// set up express

const app = express()
app.use(express.json())
app.use(cors())

// set up routes

app.use('/api/users', require('./routes/userRouter'))
app.use('/api/transactions', require('./routes/transactions'))

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// set up mongoose

// const db = require('./config/key').mongoURI

// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))
//   .catch (err => console.log(`MongoDb faild to connect with error : ${err}`));

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`The server has started on port: ${PORT}`.yellow.bold)
)

// set up mongoose
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDB connection established'.cyan.bold)
  })
  .catch((err) => {
    console.log(err.message)
  })
