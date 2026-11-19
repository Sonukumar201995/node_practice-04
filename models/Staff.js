
const bcrypt=require("bcrypt")
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



// Password Hashing Middleware
staffSchema.pre("save", async function () {

    const staff = this;

    // Check if password is modified
    if (!staff.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            staff.password,
            salt
        );

        staff.password = hashedPassword;

    } catch (error) {
        throw error;
    }
});


// Compare Password Function
staffSchema.methods.comparePassword = async function (candidatePassword) {

    try {
        const isMatch = await bcrypt.compare(
            candidatePassword,
            this.password
        );

        return isMatch;

    } catch (error) {
        throw error;
    }
};
// Create Model
const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
