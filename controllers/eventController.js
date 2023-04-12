// Reqiure the model
// This is a different way to export the model
// Still works but just a bit weird
const { CAT, Event } = require('../models/event');

// Returns all events: /events/allEvents
exports.index = (req, res) => {
    let CATegories = CAT();

    Event.find()
    .then(events => res.render('../views/event/allEvents', {events, CATegories}))
    .catch(err => console.log(err.message));
};

// Returns a form for creating a new event: /events/new
exports.new = (req, res) => {
    let CATegories = CAT();
    res.render('../views/event/newEvent', {CATegories});
};

// Creates a new event: /events
exports.create = (req, res, next) => {
    let event = new Event(req.body);
    event.hostName = req.session.user;
    let image = '/images/' + req.file.filename;
    event.image = image;
    event.save()
    .then((event) => res.redirect('/events'))
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

// Shows a specific event: /events/:id
exports.show = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id).populate('hostName', 'firstName lastName') 
    .then(event => {
        if(event) {
            // Format the start date and time
            const startDateTime = new Date(event.startDateTime);
            const formattedStart = startDateTime.toLocaleString('en-US', {timeZone: 'America/New_York', month: '2-digit', 
            day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

            // Formate the end date and time
            const endDateTime = new Date(event.endDateTime);
            const formattedEnd = endDateTime.toLocaleString('en-US', {timeZone: 'America/New_York', month: '2-digit', 
            day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

            res.render('../views/event/event', {event , formattedStart, formattedEnd});
        } else {
            let err = new Error('Cannot locate event with id of ' + req.url);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

// Returns a form for editing a specific event: /events/:id/edit
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let CATegories = CAT();

    Event.findById(id)
    .then(event => {
        if(event) {
            // Format the start date and time
            const startDateTime = new Date(event.startDateTime);
            const formattedStart = startDateTime.toISOString().slice(0, 16);

            // Formate the end date and time
            const endDateTime = new Date(event.endDateTime);
            const formattedEnd = endDateTime.toISOString().slice(0, 16);

            res.render('./event/editEvent', {event, CATegories, formattedStart, formattedEnd});
        } else {
            let err = new Error('Cannot locate event with id ' + req.url);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

// Updates a specific event: /events/:id
exports.update = (req, res, next) => {
    let id = req.params.id;
    let event = req.body;

    // Sets the image path to path and filename
    if(req.file) {
        let image = '/images/' + req.file.filename;
        event.image = image;
    } else {
        delete req.body.image;
    }

    Event.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event => {
        if(event) {
            res.redirect('/events/' + id);
        } else {
            let err = new Error('Cannot locate event with id ' + req.url);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

// Deletes a specific event: /events/:id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        if(event) {
            res.redirect('/user/profile');
        } else {
            let err = new Error('Cannot locate event with id ' + req.url);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};