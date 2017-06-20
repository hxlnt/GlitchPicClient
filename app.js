var express = require('express');
var https = require('https');
var fs = require('fs');
var app = express();

// Test image--should be replaced later with real image data
var img = require('./imgdata.js');
var data = img.data;

var imageBuffer = decodeBase64Image(data);

var options = {
  hostname: 'glitchfunction.azurewebsites.net',
  port: 443,
  path: '/api/GlitchWebhookCsharp?code=AaiiPgczD04wrwJpC0taN4oZdpD1D/bPFZtIfIlyekU4gBnjwZWK4g==',
  method: 'POST',
  headers: {
        'Content-Type': 'application/json',
    }
};

var req = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
 // var picData = [];
 // res.on('data', function (chunk) {
  //  picData.push(chunk); 
  //}).on('end', function(){
  //  JSON.parse(picData, function(key, value){
  //    if(key == "base64Picture"){

    
        fs.writeFile("glitchpic.jpg", imageBuffer.data, function(err) {
          if(err) {
            console.log(err);
          }
          console.log("The file was saved!"); 
        });
        //base64Img.img(value, '', 'glitchpic.jpg', function(err, filepath) {console.log(err)});
      
    });

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(JSON.stringify(data));

req.end();


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};
  if (matches.length !== 3) { return new Error('Invalid input string'); }
  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}