
const mongoose = require("mongoose");

// Define Staff Schema
const staffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    profile: {
        type: String,
        enum: [
            "Librarian",
            "Assistant",
            "Accountant",
            "Security",
            "Other"
        ],
        required: true
    },

    mobile: {
        type: String
    },

    email: {
        type: String
    },

    address: {
        type: String
    },

    salary: {
        type: Number
    },
    username:{
        type:String,
        required:true
    },
    password:{
          type:String,
          required:true  
    }

});

// Create Model
const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
