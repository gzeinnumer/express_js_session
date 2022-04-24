//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const PORT = 4000;

//https://www.npmjs.com/package/randomstring
var randomstring = require("randomstring");
var gen = randomstring.generate(50);
// console.log(randomstring.generate(50));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

//username and password
const myusername = 'p'
const mypassword = 'p'

// a variable to save a session
var session;

// creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;
const oneDay = 5000;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Welcome User " + session.unix + "<a href=\'/logout'>click to logout</a>");
    } else
        res.sendFile('views/index.html', { root: __dirname })
});

app.post('/user', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword) {
        session = req.session;
        session.userid = req.body.username;
        session.unix = gen;
        console.log(req.session)
        res.send(`Hey there, welcome ` + session.unix + ` <a href=\'/logout'>click to logout</a>`);
    }
    else {
        res.send('Invalid username or password');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
