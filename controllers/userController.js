const model = require('../models/user');
const { Event } = require('../models/event');

// Renders page that allows a user to create a new account
exports.new = (req, res)=>{
    res.render('./user/new');
};

// Creates a new user account - handles validation errors and duplicate email
exports.create = (req, res, next)=>{
    let user = new model(req.body);
    user.save()
    .then(user=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email already in use');  
            return res.redirect('/users/new');
        }
        
        next(err);
    }); 
};

// Renders the login page
exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

// Authenticates the user's login - handles wrong email and wrong password
exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

// Renders the user profile page - passes the user and the stories
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({hostName: id})])
    .then(results=>{
        const [user, events] = results;
        res.render('./user/profile', {user, events})
        })
    .catch(err=>next(err));
};

// Logs out the user
exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };