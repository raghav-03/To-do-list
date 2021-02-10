//require the library
const mongoose = require('mongoose');
// Schema to save data in Database
const todolistSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
})


const TODO = mongoose.model('TODO', todolistSchema);
// Export the database where data is stored
module.exports = TODO;