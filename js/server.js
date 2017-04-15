const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/getCards', function(req, res) {
    fs.readFile('cards.json', 'utf8', function (err, data) {
        let cardLibrary = JSON.parse( data );
        res.send(cardLibrary);  
    });
});

router.get('/postCards', function(req, res) {
    fs.readFile('cards.json', 'utf8', function (err, data) {
        let cardLibrary = JSON.parse( data );
        res.send(cardLibrary);  
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);