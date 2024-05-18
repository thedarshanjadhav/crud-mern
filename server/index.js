const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const mongoose = require('mongoose');
const tableRoutes = require('./routes/table')


app.use(cors());
app.use(express.json());


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/CRUD');
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// router
app.use('/', tableRoutes);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})