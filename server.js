const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const fs = require("fs");

const connectDB = require('./server/database/connection');

const app = express();
var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
  };
 // parse request to body-parser
 // app.use(bodyparser.urlencoded({ extended : true}))
app.use(bodyparser.raw(options));
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

app.use(bodyparser.json())

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
