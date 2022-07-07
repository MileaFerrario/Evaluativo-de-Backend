const express = require('express');
const People = require('./models/peopleModel');
const Party = require('./models/partyModel');
const peopleRouter = require('./routes/peopleRouter')(People);
const authRouter = require('./routes/authRouter')(People);
const partyRouter = require('./routes/partyRouter')(Party);
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
require('dotenv').config()
const { expressjwt } = require('express-jwt')

const app = express()

require('./database/db')

// mongoose.connect('mongodb://127.0.0.1:27017/peopleAPI');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// estas dos lineas sirven para trabajar con JSON

app.all(
    '/*',
    expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })
    .unless({ path: ['/auth/login', '/auth/register']
    })
  )
  
  app.use((err, _, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: err.name,
        cause: 'Unauthorized. Missing or invalid token provided.'
      })
    } else {
      next(err)
    }
  })

app.use('/api', peopleRouter, partyRouter);
app.use('/', authRouter)

app.use(errorHandler)

app.listen(5000, () => {
    console.log('Server is running!') })