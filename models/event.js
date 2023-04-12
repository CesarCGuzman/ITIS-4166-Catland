const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CATegories = ['Cat Related Events', 'Cat & Human Help Events', 'Cat Exclusive Events', 'Cat & Dog Events', 'Other'];

const eventSchema = new Schema({
    hostName: {type: Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: [true, 'Title is required']},
    category: { type: String, 
                required: [true, 'Category is required'],
                enum: CATegories},
    startDateTime: { type: Date},
    endDateTime: { type: Date},
    location: { type: String, required: [true, 'Location is required']},
    details: { type: String, required: [true, 'Details are required']},
    image: { type: String }
},
{timestamps: true}
);

module.exports = {
    CAT: () => CATegories,
    Event: mongoose.model('Event', eventSchema)
}