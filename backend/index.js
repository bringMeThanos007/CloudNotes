const connectToMongoose = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongoose();


 

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
// available routes

// default
app.post('/', (req, res) => {
  res.json('default')
})

// Authentication
app.use('/api/Auth', require('./routes/Auth'))

// for notes
app.use('/api/notes', require('./routes/Notes'));

app.listen(port, () => {
  console.log(`Example app listening ot http://localhost:${port}`)
})