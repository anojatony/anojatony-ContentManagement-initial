// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

mongoose.connect('mongodb+srv://userone:userone@ictak-files.utn4t.mongodb.net/ContentManagement?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });


// Schema definition
const Schema=mongoose.Schema;

const CatSchema=new Schema({
   catname:String
});

// Model Creation
var Category=mongoose.model('categorydata',CatSchema);

module.exports = Category;