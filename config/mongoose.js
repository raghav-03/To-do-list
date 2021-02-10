//require the library
const mongoose = require('mongoose');

//connect to the database
// mongoose.connect('mongodb://localhost/todo_list_db');
const mongourl='mongodb+srv://raghav:raghav1@cluster0.gdoaw.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongourl || 'mongodb://localhost/todo_list_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//acquire the connection(to check if it's successful)   
const db = mongoose.connection;

//error
db.on('error', function(err) {
     console.log(err.message); 
});

//up and running then print the message
db.once('open', function() {
    console.log("Successfully connected to the database todolist");
});

module.exports=db;