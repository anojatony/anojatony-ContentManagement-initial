// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

mongoose.connect('mongodb+srv://userone:userone@ictak-files.utn4t.mongodb.net/ContentManagement?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const BlogSchema=new Schema({
    title:String,
    author:String,
    introduction:String,
    content:String,
    category:String,
    date:String,
    image:String
});

// Model Creation
var Blogdata=mongoose.model('blogdata',BlogSchema);

module.exports = Blogdata;