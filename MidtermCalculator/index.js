const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

import data from './data/data.json'
app.use(bodyParser.json());

// CORS Middleware
app.use(function (req, res, next) {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});


// GET Route at '/calculator' that returns JSON string
app.get('/calculator', function ()
{
    console.log('In GET /calculator Route, return  JSON');
    res.send.JSON("My Calculator Services v1.0")
})
// POST Route at '/calculator' that takes json and outputs a calculation
app.post('/calculator', function (req, res)
{
    // If invalid POST Body then return 400 response else return calculation
    console.log('In POST /calculator Route with Post of ' + JSON.stringify(req.body));
    if(!eval(req.body.num1 + req.body.operand + req.body.num2))
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Operation"});
    }
    else
    {
        // Calculate the math expression, return the value to "/calculator/results".
        var calc = eval(req.body.num1 + req.body.operand + req.body.num2);
        res.status(200).json({error: "New Operation", location: "/calculator/results"});
     }
})

// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
