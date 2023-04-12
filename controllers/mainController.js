
// Index page
exports.index = (req, res) => {
    res.render('../views/index');
};

// Header routes
exports.signup = (req, res) => {
    res.render('../views/main/signUp');
};

// Footer routes
exports.login = (req, res) => {
    res.render('../views/main/login');
};

exports.about = (req, res) => {
    res.render('../views/main/about');
};

exports.contact = (req, res) => {
    res.render('../views/main/contact');
};

exports.twitter = (req, res) => {
    res.redirect('https://twitter.com');
};

exports.facebook = (req, res) => {
    res.redirect('https://facebook.com');
};