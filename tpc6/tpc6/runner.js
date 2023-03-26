var app = require("./app")
var fs = require('fs')
const axios = require('axios')

let rawdata = fs.readFileSync('./data.json');
let pessoas = JSON.parse(rawdata);
// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('Ready to Go!');
});