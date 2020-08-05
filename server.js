const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const errorEx = require('error-ex');

const items = require('./routes/api/items');

const app = express();

//Bodyparser middleware
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
   .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
   .then(() => console.log('MongoDb Connected...'))
   .catch(err => console.log(err));

   app.use('/api/items', items);

   if (process.env.NODE_ENV === 'production') {

      app.use(express.static('client/build'));

      app.get('*', ( req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });

   }

   const port = process.env.PORT || 5000;

   app.listen(port, () => console.log(`Server started on port ${port}`));