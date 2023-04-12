// Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');

// Creates express app
const app = express();

// Configures app
let port = 3000;
let host = 'localhost';
// %40 is used to replace an @ symbol in the password
// Place your own password in the url below
let url = 'Your MongoDB URL'
app.set('view engine', 'ejs');

// Connect to database
mongoose.connect(url)
.then(() => {
    // Start the server
    app.listen(port, host, () => {
        console.log('Server is running on port: ', port);
    });
})
.catch(err => console.log(err.message));

// Mount middleware
app.use(
    session({
        secret: "SecretPassword",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: url}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    if(req.session.user) {
        User.findById(req.session.user)
        .then(user => {
            res.locals.firstName = user.firstName;
            next();
        })
        .catch(err => next(err));
    } else {
        next();
    }
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Main routes
app.use('/', mainRoutes);

// Event routes
app.use('/events', eventRoutes);

// User routes
app.use('/users', userRoutes);

// 404 error
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }
    res.status(err.status);
    res.render('error', { error: err });
});