var mongoose = require('mongoose');
var url = "mongodb://user:user@ds015720.mlab.com:15720/temptemplolz";

//testing, have it send a msg to console that db connected
mongoose.connect(url, function(e){
    if(e) { 
        console.log("error" + e); 
    }
    else {
        console.log('db connected: ' + url);
    }
});