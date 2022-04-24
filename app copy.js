//npm install -S express ejs
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express()
const port = 3000

// var sess = {
//     secret: 'keyboard cat',
//     cookie: {}
// }

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
// }

// app.use(session(sess))

// app.get('/test', (req, res) => {
//     res.send("cetak");
// })

// app.listen(port, () => {
//     console.log(`App listening at port ${port}`)
// })

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));