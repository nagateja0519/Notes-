const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb+srv://nagateja0519:Subbanna%401929@notes.d2e0er6.mongodb.net/Users");

connect.then(() => {
        console.log("Database connected successfully");
    })
    .catch(() => {
        console.log("Error connecting to database");
    })

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const collection = new mongoose.model('user_details', Loginschema);

module.exports = collection;