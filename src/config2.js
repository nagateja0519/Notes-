const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb+srv://nagateja0519:Subbanna%401929@notes.d2e0er6.mongodb.net/Users");

connect.then(() => {
        console.log("Database connected successfully");
    })
    .catch(() => {
        console.log("Error connecting to database");
    })

const Deletenoteschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    }
})

const collection2 = new mongoose.model('deleted_notes', Deletenoteschema);

module.exports = collection2;