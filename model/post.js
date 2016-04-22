var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    title : { type: String, required: true },
    content : { type: String, required: true },
    dateCreated : { type: Date, default: Date.now() }
});
mongoose.model('Post', postSchema);