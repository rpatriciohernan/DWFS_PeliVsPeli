//DEPENDENCIES
const express = require("express");
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const routes = require("./router");

//MIDDLEWARE
server.use(bodyParser.urlencoded({extended:false }));
server.use(bodyParser.json());
server.use(cors());
server.use("/", routes);

//BASE ENDPOINT
server.get("/", function(req, res) {
    res.send(`Welcome to PeliVsPeli 1.0. Connection started at port ${process.env.APP_PORT}`);
});

//APP LISTENER
server.listen(process.env.APP_PORT, () => console.log(`Listening in port ${process.env.APP_PORT}`));