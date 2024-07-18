const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');
const collection1 = require('./config1');
const collection2 = require('./config2');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/notes', async(req, res) => {
    const notes = await collection1.find();
    res.render('notes', { notesList: notes });
})


app.post('/add', async(req, res) => {
    const data1 = {
        title: req.body.title,
        description: req.body.description,
        label: req.body.label
    }
    const data2 = await collection1.insertMany(data1);
    console.log(data2)
    res.redirect('/home')
})

app.post('/signup', async(req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    }
    const existinguser = await collection.findOne({ name: data.name })
    if (existinguser) {
        res.send("User already existed")
    } else {
        const saltrounds = 10;
        const hashedpass = await bcrypt.hash(data.password, saltrounds);
        data.password = hashedpass;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect('/')
    }
})

app.post('/login', async(req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    }
    const existinguser = await collection.findOne({ name: data.name })
    if (existinguser) {
        const isMatch = await bcrypt.compare(data.password, existinguser.password);
        if (isMatch) {
            res.redirect('/home')
        } else {
            res.send("Incorrect Password");
        }
    } else {
        res.send("User does not exist");
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})